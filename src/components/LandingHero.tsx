import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, MapPin, AlertCircle, Compass, Utensils, Home, QrCode, ArrowRight, HeartHandshake, PhoneCall, Wifi } from 'lucide-react';

export const LandingHero: React.FC = () => {
  const {
    t,
    setActiveNavTab,
    setFilters,
    lowBandwidth,
    setSafetyModalOpen,
    setKumbhPassModalOpen,
    setLostStayFinderOpen,
    setUserRole,
  } = useApp();

  const handleQuickCategory = (type: 'food' | 'stay' | 'verified') => {
    if (type === 'food') {
      setFilters((prev) => ({ ...prev, typeFilter: 'food', verifiedOnly: false }));
      setActiveNavTab('food');
    } else if (type === 'stay') {
      setFilters((prev) => ({ ...prev, typeFilter: 'stay', verifiedOnly: false }));
      setActiveNavTab('stay');
    } else if (type === 'verified') {
      setFilters((prev) => ({ ...prev, typeFilter: 'all', verifiedOnly: true }));
      setActiveNavTab('explore');
    }
  };

  return (
    <div className="bg-stone-50 border-b border-stone-200">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-800 bg-orange-100/80 px-3 py-1 rounded-md border border-orange-200">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
              <span>Nashik Kumbh Mela 2026 — Verified Hyperlocal Civic Platform</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Find trusted food and affordable stays around you.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Discover verified local homes, PGs, rooms, tiffin services and homemade meals during Nashik Kumbh. Zero middlemen, transparent local prices, and crowd-aware discovery.
              </p>
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, typeFilter: 'all', verifiedOnly: false }));
                  setActiveNavTab('explore');
                }}
                className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-md shadow-orange-600/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>{t('exploreNearby')}</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => {
                  setUserRole('provider');
                  setActiveNavTab('provider-dash');
                }}
                className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold text-sm transition-all cursor-pointer"
              >
                {t('becomeProvider')}
              </button>

              <button
                onClick={() => setLostStayFinderOpen(true)}
                className="px-4 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-semibold text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>{t('findMyStay')}</span>
              </button>
            </div>

            {/* Three Quick Discovery Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => handleQuickCategory('food')}
                className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-orange-300 hover:shadow-sm text-left transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-2 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-stone-900">Food Near Me</div>
                <div className="text-xs text-stone-500 mt-0.5">Home meals & tiffins from ₹40</div>
              </button>

              <button
                onClick={() => handleQuickCategory('stay')}
                className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-orange-300 hover:shadow-sm text-left transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-2 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-stone-900">Stay Near Me</div>
                <div className="text-xs text-stone-500 mt-0.5">PGs, homestays from ₹250/night</div>
              </button>

              <button
                onClick={() => handleQuickCategory('verified')}
                className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-sm text-left transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-stone-900">Verified & Safe</div>
                <div className="text-xs text-stone-500 mt-0.5">Phone & ID document checked</div>
              </button>
            </div>
          </div>

          {/* Right Visual Image Block */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-lg">
              {!lowBandwidth ? (
                <div className="aspect-16/10 relative overflow-hidden bg-stone-900">
                  <img
                    src="/src/assets/images/hero_kumbh_nashik_1790698478442.jpg"
                    alt="Nashik Kumbh Mela Godavari Ghats"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <div className="text-xs font-semibold tracking-wide uppercase text-orange-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Godavari Ghats, Ram Kund, Nashik</span>
                    </div>
                    <div className="text-base font-bold mt-1 text-white">
                      Sacred bathing ghats & historic Panchavati
                    </div>
                    <div className="text-xs text-stone-300 mt-0.5">
                      Simulated real-time density: Ram Kund (High) · Tapovan (Moderate)
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-orange-50/50 border border-orange-200 text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center mx-auto mb-2">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-stone-900">Nashik Kumbh Hyperlocal Discovery</div>
                  <div className="text-xs text-stone-600 mt-1">
                    Image suppressed to save cellular bandwidth on crowded ghats.
                  </div>
                </div>
              )}

              {/* Status Ribbon below image */}
              <div className="p-4 bg-white grid grid-cols-3 divide-x divide-stone-100 text-center text-xs">
                <div>
                  <div className="font-bold text-stone-900 text-sm">25+</div>
                  <div className="text-stone-500 text-[11px]">Home Kitchens</div>
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm">18+</div>
                  <div className="text-stone-500 text-[11px]">Verified PGs & Stays</div>
                </div>
                <div>
                  <div className="font-bold text-emerald-600 text-sm">100%</div>
                  <div className="text-stone-500 text-[11px]">Price Watch Capped</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why KumbhConnect Section */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {t('whyKumbhConnect')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Built specifically to solve safety, price gouging, and navigation hurdles during massive Kumbh gatherings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">{t('why1Title')}</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{t('why1Desc')}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">{t('why2Title')}</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{t('why2Desc')}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">{t('why3Title')}</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{t('why3Desc')}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center mb-3">
                <Wifi className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">{t('why4Title')}</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{t('why4Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
