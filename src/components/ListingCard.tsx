import React from 'react';
import { ProviderListing } from '../types';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Star,
  MapPin,
  Clock,
  Heart,
  AlertTriangle,
  CheckCircle2,
  Utensils,
  Home,
  Info,
  ChevronRight,
} from 'lucide-react';

interface ListingCardProps {
  listing: ProviderListing;
  onSelect: (listing: ProviderListing) => void;
  onOrderOrBook: (listing: ProviderListing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onSelect,
  onOrderOrBook,
}) => {
  const {
    t,
    lowBandwidth,
    savedFavorites,
    toggleFavorite,
    setReportModalListing,
  } = useApp();

  const isFavorite = savedFavorites.includes(listing.id);
  const isFood = listing.type === 'food';
  
  // Price Watch Logic
  const isOverpriced = listing.basePrice > listing.typicalMaxPrice;
  const isFairPrice = !isOverpriced;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-orange-300 hover:shadow-md transition-all flex flex-col group">
      {/* Visual Image / Low-Bandwidth Header */}
      <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
        {!lowBandwidth && listing.images && listing.images[0] ? (
          <img
            src={listing.images[0]}
            alt={listing.providerName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-orange-50/50 text-stone-600">
            {isFood ? (
              <Utensils className="w-8 h-8 text-orange-600 mb-1" />
            ) : (
              <Home className="w-8 h-8 text-stone-700 mb-1" />
            )}
            <span className="text-xs font-semibold text-stone-800">
              {listing.category.replace('_', ' ').toUpperCase()}
            </span>
            <span className="text-[10px] text-stone-500">
              {lowBandwidth ? 'Image hidden (Low Bandwidth)' : 'Verified Local Host'}
            </span>
          </div>
        )}

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Trust Level Indicator */}
          <div className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-white/95 backdrop-blur-sm text-stone-900 shadow-xs border border-stone-200">
            {listing.verificationLevel === 'provider_verified' ? (
              <>
                <Shield className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                <span className="text-emerald-800 font-bold text-[11px]">Verified Provider</span>
              </>
            ) : listing.verificationLevel === 'identity_submitted' ? (
              <>
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-800 text-[11px]">ID Submitted</span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-stone-600 text-[11px]">Pending Review</span>
              </>
            )}
          </div>

          {/* Favorite Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(listing.id);
            }}
            className="pointer-events-auto p-1.5 rounded-full bg-white/95 backdrop-blur-sm text-stone-600 hover:text-rose-600 shadow-xs transition-colors cursor-pointer"
            aria-label="Save to favorites"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
              }`}
            />
          </button>
        </div>

        {/* Bottom Tag Scrim */}
        <div className="absolute bottom-2 left-2.5 pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur-sm">
            {isFood
              ? listing.isVegetarian
                ? '🟢 Pure Veg'
                : '🔴 Non-Veg'
              : `🏠 ${listing.roomDetails?.roomType || 'Stay'}`}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-700">{listing.location.areaName}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-stone-600">
              <MapPin className="w-3 h-3 text-stone-400" />
              <span>{listing.location.distanceKm} km</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-amber-700 font-semibold tabular-nums">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{listing.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({listing.reviewCount})</span>
            </span>
          </div>

          {/* Provider Name */}
          <h3
            onClick={() => onSelect(listing)}
            className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors cursor-pointer line-clamp-1"
          >
            {listing.providerName}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {listing.shortDescription}
          </p>
        </div>

        {/* Price Watch Block */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-base font-extrabold text-stone-900 tabular-nums">
                ₹{listing.basePrice}
                <span className="text-xs font-normal text-stone-500 ml-1">
                  / {listing.priceUnit}
                </span>
              </div>
            </div>

            {/* Kumbh Price Watch Benchmark Status */}
            <div className="text-right">
              {isFairPrice ? (
                <div
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700"
                  title={`Typical local Nashik range: ₹${listing.typicalMinPrice}–₹${listing.typicalMaxPrice}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Fair Price</span>
                </div>
              ) : (
                <button
                  onClick={() => setReportModalListing(listing)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:underline cursor-pointer"
                  title="Price appears higher than local range. Tap to report."
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>High Price Alert</span>
                </button>
              )}
              <div className="text-[10px] text-stone-400">
                Typical: ₹{listing.typicalMinPrice}–₹{listing.typicalMaxPrice}
              </div>
            </div>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSelect(listing)}
            className="py-2 px-3 rounded-xl border border-stone-200 hover:border-stone-300 text-stone-700 hover:text-stone-900 text-xs font-semibold text-center transition-colors cursor-pointer"
          >
            {t('viewDetails')}
          </button>

          <button
            onClick={() => onOrderOrBook(listing)}
            className="py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold text-center shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <span>{isFood ? t('orderMeal') : t('bookStay')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
