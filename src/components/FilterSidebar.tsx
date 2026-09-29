import React from 'react';
import { useApp } from '../context/AppContext';
import { Filter, X, Shield, Star, MapPin, Check } from 'lucide-react';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const { filters, setFilters, resetFilters, t } = useApp();

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-orange-600" />
          <h3 className="font-bold text-sm text-stone-900">{t('filters')}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs text-stone-500 hover:text-orange-600 underline cursor-pointer"
          >
            {t('resetFilters')}
          </button>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Type Segmented Control */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Offer Type
        </label>
        <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, typeFilter: 'all' }))}
            className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
              filters.typeFilter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, typeFilter: 'food' }))}
            className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
              filters.typeFilter === 'food'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🍱 Food
          </button>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, typeFilter: 'stay' }))}
            className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
              filters.typeFilter === 'stay'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🏠 Stay
          </button>
        </div>
      </div>

      {/* Trust & Safety Toggle */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Trust & Verification
        </label>
        <label className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 cursor-pointer hover:bg-emerald-50 transition-colors">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-900">{t('verifiedOnly')}</span>
          </div>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))
            }
            className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Distance Filter */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            {t('distance')}
          </label>
          <span className="text-xs font-bold text-orange-600">
            {filters.maxDistanceKm >= 10 ? 'All Nashik' : `< ${filters.maxDistanceKm} km`}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[1, 3, 5, 10].map((dist) => (
            <button
              key={dist}
              onClick={() => setFilters((prev) => ({ ...prev, maxDistanceKm: dist }))}
              className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                filters.maxDistanceKm === dist
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {dist === 10 ? 'Any' : `<${dist}km`}
            </button>
          ))}
        </div>
      </div>

      {/* Area Selector */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          {t('area')}
        </label>
        <select
          value={filters.areaFilter}
          onChange={(e) => setFilters((prev) => ({ ...prev, areaFilter: e.target.value }))}
          className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-orange-500 cursor-pointer"
        >
          <option value="all">All Nashik Areas</option>
          <option value="Panchavati">Panchavati (Near Kalaram)</option>
          <option value="Ram Kund">Ram Kund (Sacred Ghats)</option>
          <option value="Tapovan">Tapovan (Sadhugram)</option>
          <option value="CBS">CBS / Ashok Stambh</option>
          <option value="Gangapur Road">Gangapur Road</option>
          <option value="Nashik Road">Nashik Road (Station)</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          {t('category')}
        </label>
        <div className="space-y-1">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'food_home', label: '🍱 Homemade Food' },
            { id: 'food_tiffin', label: '🍱 Tiffin Service' },
            { id: 'stay_pg', label: '🏠 PG Accommodation' },
            { id: 'stay_room', label: '🏠 Private Room' },
            { id: 'stay_homestay', label: '🏠 Family Homestay' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters((prev) => ({ ...prev, categoryFilter: cat.id }))}
              className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                filters.categoryFilter === cat.id
                  ? 'bg-orange-50 text-orange-800 font-semibold'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{cat.label}</span>
              {filters.categoryFilter === cat.id && (
                <Check className="w-3.5 h-3.5 text-orange-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filters (Food or Stay) */}
      {(filters.typeFilter === 'all' || filters.typeFilter === 'food') && (
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Food Price Range
          </label>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {[
              { id: 'all', label: 'Any Price' },
              { id: 'under100', label: 'Under ₹100' },
              { id: '100_200', label: '₹100–₹200' },
              { id: '200plus', label: '₹200+' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, priceRangeFood: p.id as any }))
                }
                className={`py-1.5 px-2 rounded-lg border text-center transition-colors cursor-pointer ${
                  filters.priceRangeFood === p.id
                    ? 'bg-orange-600 text-white border-orange-600 font-semibold'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {(filters.typeFilter === 'all' || filters.typeFilter === 'stay') && (
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Stay Price / Night
          </label>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {[
              { id: 'all', label: 'Any Price' },
              { id: 'under500', label: 'Under ₹500' },
              { id: '500_1000', label: '₹500–₹1000' },
              { id: '1000plus', label: '₹1000+' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, priceRangeStay: p.id as any }))
                }
                className={`py-1.5 px-2 rounded-lg border text-center transition-colors cursor-pointer ${
                  filters.priceRangeStay === p.id
                    ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Rating Filter */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Minimum Rating
        </label>
        <div className="flex items-center gap-1.5">
          {[0, 3, 4, 4.5].map((rt) => (
            <button
              key={rt}
              onClick={() => setFilters((prev) => ({ ...prev, minRating: rt }))}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                filters.minRating === rt
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>{rt === 0 ? 'All' : `${rt}+`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
