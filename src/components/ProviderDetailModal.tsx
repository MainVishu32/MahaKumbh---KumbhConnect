import React from 'react';
import { ProviderListing, MenuItem } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Shield,
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Share2,
  Utensils,
  Home,
  Check,
  Flag,
  Navigation,
} from 'lucide-react';
import { MOCK_REVIEWS } from '../data/mockData';

interface ProviderDetailModalProps {
  listing: ProviderListing;
  onClose: () => void;
  onOrderMeal: (listing: ProviderListing) => void;
  onBookStay: (listing: ProviderListing) => void;
}

export const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({
  listing,
  onClose,
  onOrderMeal,
  onBookStay,
}) => {
  const {
    t,
    lowBandwidth,
    savedFavorites,
    toggleFavorite,
    setReportModalListing,
  } = useApp();

  const isFood = listing.type === 'food';
  const isFavorite = savedFavorites.includes(listing.id);
  const isOverpriced = listing.basePrice > listing.typicalMaxPrice;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 max-h-[92vh] flex flex-col">
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-5 py-3 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              {isFood ? '🍱 Food Provider' : '🏠 Accommodation Provider'}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500 font-medium">Nashik Kumbh 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(listing.id)}
              className="p-1.5 text-stone-500 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
              title="Save to favorites"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-500'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          {/* Cover & Gallery */}
          <div className="relative aspect-16/9 sm:aspect-21/9 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            {!lowBandwidth && listing.images && listing.images[0] ? (
              <img
                src={listing.images[0]}
                alt={listing.providerName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-orange-50 text-stone-600 p-6 text-center">
                <div>
                  {isFood ? (
                    <Utensils className="w-10 h-10 text-orange-600 mx-auto mb-2" />
                  ) : (
                    <Home className="w-10 h-10 text-stone-700 mx-auto mb-2" />
                  )}
                  <div className="font-bold text-stone-800 text-sm">{listing.providerName}</div>
                  <div className="text-xs text-stone-500">
                    {lowBandwidth ? 'High-res image paused in Low Bandwidth mode' : 'Verified Listing'}
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>{listing.location.areaName}</span>
              <span>·</span>
              <span>{listing.location.distanceKm} km from Kumbh Ghat</span>
            </div>
          </div>

          {/* Title & Verification Status Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Shield className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>{listing.verificationBadgeText}</span>
              </div>

              {listing.idDocumentType && (
                <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                  {listing.idDocumentType} ({listing.idDocumentNumberMasked})
                </span>
              )}

              <div className="flex items-center gap-1 text-xs text-amber-700 font-bold ml-auto tabular-nums">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{listing.rating.toFixed(1)}</span>
                <span className="text-stone-400 font-normal">({listing.reviewCount} pilgrim reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              {listing.providerName}
            </h2>
            <p className="text-sm font-medium text-stone-700">{listing.title}</p>
            <p className="text-xs text-stone-500">{listing.location.address} {listing.location.landmark && `(${listing.location.landmark})`}</p>
          </div>

          {/* Kumbh Price Watch Banner */}
          <div className={`p-4 rounded-xl border ${
            isOverpriced ? 'bg-rose-50 border-rose-200' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <span>Kumbh Price Watch</span>
                  {isOverpriced ? (
                    <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded text-[10px]">Overpriced Warning</span>
                  ) : (
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">Fair Pricing Verified</span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Typical local Nashik range for this service is <strong className="text-stone-900">₹{listing.typicalMinPrice}–₹{listing.typicalMaxPrice}</strong>.
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-stone-900 tabular-nums">
                  ₹{listing.basePrice}
                  <span className="text-xs font-normal text-stone-500 ml-1">/ {listing.priceUnit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Provider */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              About This Host
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {listing.description}
            </p>
            {listing.hygieneNotes && (
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700">
                <strong className="text-stone-900">Hygiene & Safety Protocol: </strong>
                {listing.hygieneNotes}
              </div>
            )}
          </div>

          {/* Service Details (Menu or Room Details) */}
          {isFood && listing.menuItems && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Menu & Available Meals
                </h3>
                <span className="text-xs text-stone-500">Prepared fresh upon request</span>
              </div>

              <div className="space-y-2">
                {listing.menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{item.name}</span>
                        {item.nameMr && (
                          <span className="text-xs text-stone-500 font-medium font-serif">
                            ({item.nameMr})
                          </span>
                        )}
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">{item.description}</p>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Prep time: ~{item.preparationTimeMins} mins</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                      <span className="text-sm font-bold text-stone-900 tabular-nums">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => onOrderMeal(listing)}
                        className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
                      >
                        Order This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isFood && listing.roomDetails && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Room Specifications & Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="text-stone-500">Room Type</div>
                  <div className="font-bold text-stone-900 mt-0.5">{listing.roomDetails.roomType}</div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="text-stone-500">Max Guests</div>
                  <div className="font-bold text-stone-900 mt-0.5">{listing.roomDetails.maxGuests} Guests</div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="text-stone-500">Attached Bath</div>
                  <div className="font-bold text-stone-900 mt-0.5">
                    {listing.roomDetails.hasAttachedBathroom ? 'Yes (Private)' : 'Clean Shared'}
                  </div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="text-stone-500">Check-in / Out</div>
                  <div className="font-bold text-stone-900 mt-0.5">
                    {listing.roomDetails.checkInTime} / {listing.roomDetails.checkOutTime}
                  </div>
                </div>
              </div>

              {listing.roomDetails.amenities && (
                <div className="pt-2">
                  <div className="text-xs font-semibold text-stone-700 mb-2">Amenities Included:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.roomDetails.amenities.map((am, i) => (
                      <span
                        key={i}
                        className="text-xs text-stone-700 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-md"
                      >
                        ✓ {am}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pilgrim Reviews Section */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Pilgrim Reviews & Experiences
            </h3>
            <div className="space-y-2">
              {MOCK_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">{rev.authorName} ({rev.city})</span>
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-stone-600">{rev.comment}</p>
                  <div className="text-[10px] text-emerald-700 font-medium">✓ Verified Pilgrim Stay / Meal</div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Listing Callout */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Notice price gouging or misleading photos?</span>
            <button
              onClick={() => {
                setReportModalListing(listing);
                onClose();
              }}
              className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Report this listing</span>
            </button>
          </div>
        </div>

        {/* Modal Sticky Bottom Bar */}
        <div className="sticky bottom-0 z-30 bg-white border-t border-stone-200 px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${listing.hostPhone}`}
              className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-stone-600" />
              <span>{t('callProvider')}</span>
            </a>
            <a
              href={`https://wa.me/${listing.hostPhone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('whatsappProvider')}</span>
            </a>
          </div>

          <button
            onClick={() => {
              if (isFood) onOrderMeal(listing);
              else onBookStay(listing);
            }}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-orange-600/20 cursor-pointer transition-colors"
          >
            {isFood ? t('orderMeal') : t('bookStay')}
          </button>
        </div>
      </div>
    </div>
  );
};
