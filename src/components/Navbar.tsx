import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, AlertTriangle, QrCode, WifiOff, Users, Utensils, Home, Compass } from 'lucide-react';
import { UserRole, Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    userRole,
    setUserRole,
    language,
    setLanguage,
    lowBandwidth,
    setLowBandwidth,
    activeNavTab,
    setActiveNavTab,
    setSafetyModalOpen,
    setKumbhPassModalOpen,
    t,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Low Bandwidth Announcement Banner if ON */}
      {lowBandwidth && (
        <div className="bg-amber-600 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Low Bandwidth Mode ON — Heavy images reduced, optimized for Kumbh crowds.</span>
          <button
            onClick={() => setLowBandwidth(false)}
            className="underline ml-2 hover:text-amber-100 cursor-pointer"
          >
            Turn Off
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveNavTab('explore')}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-600/30 group-hover:bg-orange-700 transition-colors">
              <span className="font-serif font-black text-lg">कु</span>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors flex items-center gap-1.5">
                <span>KumbhConnect</span>
                <span className="text-orange-600 text-xs px-1.5 py-0.5 bg-orange-50 border border-orange-200 rounded font-semibold uppercase tracking-wider">Nashik</span>
              </div>
              <div className="text-[10px] text-stone-500 font-medium hidden sm:block">
                {t('subTagline')}
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveNavTab('explore')}
            className={`hover:text-orange-600 transition-colors cursor-pointer py-1 ${
              activeNavTab === 'explore' ? 'text-orange-600 font-semibold border-b-2 border-orange-600' : ''
            }`}
          >
            {t('exploreNearby')}
          </button>
          
          <button
            onClick={() => {
              setActiveNavTab('food');
            }}
            className={`hover:text-orange-600 transition-colors cursor-pointer py-1 ${
              activeNavTab === 'food' ? 'text-orange-600 font-semibold border-b-2 border-orange-600' : ''
            }`}
          >
            {t('foodNearMe')}
          </button>

          <button
            onClick={() => {
              setActiveNavTab('stay');
            }}
            className={`hover:text-orange-600 transition-colors cursor-pointer py-1 ${
              activeNavTab === 'stay' ? 'text-orange-600 font-semibold border-b-2 border-orange-600' : ''
            }`}
          >
            {t('stayNearMe')}
          </button>

          <button
            onClick={() => setKumbhPassModalOpen(true)}
            className="hover:text-orange-600 transition-colors cursor-pointer flex items-center gap-1.5 py-1 text-stone-700"
          >
            <QrCode className="w-4 h-4 text-orange-600" />
            <span>{t('myKumbhPass')}</span>
          </button>

          <button
            onClick={() => setSafetyModalOpen(true)}
            className="hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1.5 py-1 text-stone-700"
          >
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>{t('safety')}</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + Language & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
            {(['en', 'mr', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  language === lang
                    ? 'bg-white text-orange-700 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
              </button>
            ))}
          </div>

          {/* Low Bandwidth Toggle */}
          <button
            onClick={() => setLowBandwidth(!lowBandwidth)}
            title={lowBandwidth ? 'Low-bandwidth mode active' : 'Turn on low-bandwidth mode'}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              lowBandwidth
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{lowBandwidth ? 'Low-BW ON' : 'Low-BW'}</span>
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <select
              value={userRole}
              onChange={(e) => {
                const newRole = e.target.value as UserRole;
                setUserRole(newRole);
                if (newRole === 'provider') {
                  setActiveNavTab('provider-dash');
                } else if (newRole === 'admin') {
                  setActiveNavTab('admin-dash');
                } else {
                  setActiveNavTab('explore');
                }
              }}
              className="text-xs font-semibold bg-stone-900 text-white rounded-lg px-2.5 py-1.5 pr-6 cursor-pointer hover:bg-stone-800 transition-colors focus:outline-none appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.35rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.2em 1.2em',
              }}
            >
              <option value="pilgrim">Pilgrim View</option>
              <option value="provider">Provider Portal</option>
              <option value="admin">Admin Console</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
