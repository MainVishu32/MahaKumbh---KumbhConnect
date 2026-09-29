import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveNavTab, setSafetyModalOpen, setKumbhPassModalOpen } = useApp();

  return (
    <footer className="bg-white border-t border-stone-200 mt-16 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                कु
              </div>
              <span className="font-bold text-stone-900 text-base">KumbhConnect Nashik</span>
            </div>
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              A hyperlocal civic technology marketplace connecting Kumbh pilgrims with verified local home kitchens, tiffin services, and affordable family homestays across Nashik, Maharashtra.
            </p>
            <div className="text-[11px] text-stone-400">
              Disclaimer: Verification confirms telephone contact and submitted municipal/identity records to curb fraud. Does not claim government Aadhaar biometric verification.
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-stone-900 uppercase tracking-wider">Pilgrim Services</div>
            <ul className="space-y-1.5 text-stone-600">
              <li>
                <button
                  onClick={() => setActiveNavTab('food')}
                  className="hover:text-orange-600 cursor-pointer"
                >
                  Home Kitchens & Tiffins
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNavTab('stay')}
                  className="hover:text-orange-600 cursor-pointer"
                >
                  Verified PGs & Wada Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => setKumbhPassModalOpen(true)}
                  className="hover:text-orange-600 cursor-pointer"
                >
                  My Kumbh Pass & Safety QR
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSafetyModalOpen(true)}
                  className="hover:text-rose-600 cursor-pointer text-rose-700 font-semibold"
                >
                  Emergency Contacts (112)
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-stone-900 uppercase tracking-wider">Nashik Hubs</div>
            <ul className="space-y-1.5 text-stone-500">
              <li>Ram Kund & Godavari Ghats</li>
              <li>Panchavati & Kalaram Mandir</li>
              <li>Tapovan Sadhugram</li>
              <li>CBS Transit Terminal</li>
              <li>Gangapur Road Corridor</li>
              <li>Nashik Road Railway Sector</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <div>
            © 2026 KumbhConnect Nashik. Hyperlocal civic marketplace initiative.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Built for the sacred Nashik Kumbh Mela</span>
            <span>·</span>
            <span>Nashik, Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
