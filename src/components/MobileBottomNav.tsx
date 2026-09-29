import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Utensils, Home, QrCode, Shield, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    activeNavTab,
    setActiveNavTab,
    setKumbhPassModalOpen,
    setSafetyModalOpen,
    userRole,
  } = useApp();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 h-16 px-2 flex items-center justify-around">
      {userRole === 'pilgrim' ? (
        <>
          <button
            onClick={() => setActiveNavTab('explore')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center cursor-pointer ${
              activeNavTab === 'explore' ? 'text-orange-600 font-bold' : 'text-stone-500'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Explore</span>
          </button>

          <button
            onClick={() => setActiveNavTab('food')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center cursor-pointer ${
              activeNavTab === 'food' ? 'text-orange-600 font-bold' : 'text-stone-500'
            }`}
          >
            <Utensils className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Food</span>
          </button>

          <button
            onClick={() => setActiveNavTab('stay')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center cursor-pointer ${
              activeNavTab === 'stay' ? 'text-orange-600 font-bold' : 'text-stone-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Stays</span>
          </button>

          <button
            onClick={() => setKumbhPassModalOpen(true)}
            className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center cursor-pointer text-orange-600 font-semibold"
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Pass & QR</span>
          </button>

          <button
            onClick={() => setSafetyModalOpen(true)}
            className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center cursor-pointer text-emerald-700"
          >
            <Shield className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Safety</span>
          </button>
        </>
      ) : userRole === 'provider' ? (
        <div className="w-full flex items-center justify-around text-xs font-semibold">
          <button
            onClick={() => setActiveNavTab('provider-dash')}
            className="text-orange-600 font-bold flex items-center gap-1.5"
          >
            <span>Host Portal Active</span>
          </button>
          <button
            onClick={() => setActiveNavTab('explore')}
            className="text-stone-500"
          >
            Switch to Pilgrim
          </button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-around text-xs font-semibold">
          <button
            onClick={() => setActiveNavTab('admin-dash')}
            className="text-orange-600 font-bold flex items-center gap-1.5"
          >
            <span>Admin Console Active</span>
          </button>
          <button
            onClick={() => setActiveNavTab('explore')}
            className="text-stone-500"
          >
            Switch to Pilgrim
          </button>
        </div>
      )}
    </nav>
  );
};
