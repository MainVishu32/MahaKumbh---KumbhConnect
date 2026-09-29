import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LeafletMap } from './LeafletMap';
import { ListingCard } from './ListingCard';
import { FilterSidebar } from './FilterSidebar';
import { CrowdSmartWidget } from './CrowdSmartWidget';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Map as MapIcon,
  List,
  Utensils,
  Home,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { ProviderListing } from '../types';

export const PilgrimExplorer: React.FC = () => {
  const {
    listings,
    filters,
    setFilters,
    resetFilters,
    setSelectedListing,
    setOrderModalListing,
    setBookingModalListing,
    selectedListing,
    t,
  } = useApp();

  const [mobileViewMode, setMobileViewMode] = useState<'both' | 'map' | 'list'>('both');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter listings based on current filters state
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Don't show suspended listings to pilgrims
      if (item.status === 'suspended') return false;

      // Type filter
      if (filters.typeFilter !== 'all' && item.type !== filters.typeFilter) {
        return false;
      }

      // Category filter
      if (filters.categoryFilter !== 'all' && item.category !== filters.categoryFilter) {
        return false;
      }

      // Distance filter
      if (item.location.distanceKm && item.location.distanceKm > filters.maxDistanceKm) {
        return false;
      }

      // Area filter
      if (filters.areaFilter !== 'all' && item.location.areaName !== filters.areaFilter) {
        return false;
      }

      // Verified only
      if (filters.verifiedOnly && item.verificationLevel !== 'provider_verified') {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && item.rating < filters.minRating) {
        return false;
      }

      // Food price filter
      if (item.type === 'food' && filters.priceRangeFood !== 'all') {
        if (filters.priceRangeFood === 'under100' && item.basePrice >= 100) return false;
        if (filters.priceRangeFood === '100_200' && (item.basePrice < 100 || item.basePrice > 200)) return false;
        if (filters.priceRangeFood === '200plus' && item.basePrice < 200) return false;
      }

      // Stay price filter
      if (item.type === 'stay' && filters.priceRangeStay !== 'all') {
        if (filters.priceRangeStay === 'under500' && item.basePrice >= 500) return false;
        if (filters.priceRangeStay === '500_1000' && (item.basePrice < 500 || item.basePrice > 1000)) return false;
        if (filters.priceRangeStay === '1000plus' && item.basePrice < 1000) return false;
      }

      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = item.providerName.toLowerCase().includes(q);
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesArea = item.location.areaName.toLowerCase().includes(q);
        if (!matchesName && !matchesTitle && !matchesDesc && !matchesArea) {
          return false;
        }
      }

      return true;
    });
  }, [listings, filters]);

  const handleOrderOrBook = (listing: ProviderListing) => {
    if (listing.type === 'food') {
      setOrderModalListing(listing);
    } else {
      setBookingModalListing(listing);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Search & Top Action Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Location Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>Nashik, Maharashtra</span>
          </div>

          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Quick Discovery Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 text-[11px] font-semibold uppercase pr-1 shrink-0">
            Quick:
          </span>
          {[
            { label: 'All Offers', type: 'all' },
            { label: '🍱 Homemade Food', type: 'food' },
            { label: '🏠 Affordable Stays', type: 'stay' },
            { label: '🛡️ Verified Only', verified: true },
          ].map((pill, i) => (
            <button
              key={i}
              onClick={() => {
                if (pill.verified) {
                  setFilters((prev) => ({ ...prev, verifiedOnly: !prev.verifiedOnly }));
                } else if (pill.type) {
                  setFilters((prev) => ({ ...prev, typeFilter: pill.type as any }));
                }
              }}
              className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-colors cursor-pointer ${
                (pill.type && filters.typeFilter === pill.type && !filters.verifiedOnly) ||
                (pill.verified && filters.verifiedOnly)
                  ? 'bg-orange-600 text-white border-orange-600 font-semibold'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* CrowdSmart Banner */}
      <CrowdSmartWidget />

      {/* Mobile Map / List Toggle */}
      <div className="flex sm:hidden items-center justify-between p-1 bg-stone-200 rounded-xl">
        <button
          onClick={() => setMobileViewMode('both')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
            mobileViewMode === 'both' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
          }`}
        >
          Split View
        </button>
        <button
          onClick={() => setMobileViewMode('map')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
            mobileViewMode === 'map' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
          }`}
        >
          Map View
        </button>
        <button
          onClick={() => setMobileViewMode('list')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
            mobileViewMode === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
          }`}
        >
          List ({filteredListings.length})
        </button>
      </div>

      {/* Explorer Core Layout: Left (Filters) — Center/Right (Map & Listings) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20">
          <FilterSidebar />
        </div>

        {/* Center / Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Map View */}
          {(mobileViewMode === 'both' || mobileViewMode === 'map') && (
            <div className="h-[360px] sm:h-[420px] w-full">
              <LeafletMap
                listings={filteredListings}
                onSelectListing={(l) => setSelectedListing(l)}
                selectedListingId={selectedListing?.id}
              />
            </div>
          )}

          {/* Listings Grid */}
          {(mobileViewMode === 'both' || mobileViewMode === 'list') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-stone-900">
                    Nearby Verified Listings
                  </h3>
                  <p className="text-xs text-stone-500">
                    Showing <strong className="text-stone-800">{filteredListings.length}</strong> available providers around Nashik
                  </p>
                </div>

                {filteredListings.length > 0 && (
                  <span className="text-xs text-stone-500 font-medium">
                    Sorted by proximity to Ghats
                  </span>
                )}
              </div>

              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onSelect={(l) => setSelectedListing(l)}
                      onOrderOrBook={handleOrderOrBook}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="p-12 bg-white border border-stone-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900">
                    No verified listings match your selected filters
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try expanding your distance radius, adjusting price range, or clearing filters to see all available Nashik providers.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-4 animate-in slide-in-from-right">
            <FilterSidebar onCloseMobile={() => setMobileFiltersOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
