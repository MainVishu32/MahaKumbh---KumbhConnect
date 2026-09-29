import React from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_CONTACTS } from '../data/mockData';
import {
  X,
  Shield,
  PhoneCall,
  HeartPulse,
  Hospital,
  Users,
  LifeBuoy,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const SafetyHubModal: React.FC = () => {
  const { safetyModalOpen, setSafetyModalOpen, setLostStayFinderOpen, t } = useApp();

  if (!safetyModalOpen) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-emerald-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'Hospital':
        return <Hospital className="w-5 h-5 text-blue-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-amber-600" />;
      case 'LifeBuoy':
        return <LifeBuoy className="w-5 h-5 text-orange-600" />;
      default:
        return <PhoneCall className="w-5 h-5 text-stone-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900">
                {t('emergencyHelp')} & Safety Hub
              </h3>
              <p className="text-[11px] text-stone-500">Nashik Administration 24/7 Hotlines</p>
            </div>
          </div>
          <button
            onClick={() => setSafetyModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Lost Pilgrim Banner CTA */}
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-stone-900">Separated from family or stay?</div>
              <div className="text-[11px] text-stone-600 mt-0.5">Use your digital Kumbh pass to retrieve directions to your booked room.</div>
            </div>
            <button
              onClick={() => {
                setSafetyModalOpen(false);
                setLostStayFinderOpen(true);
              }}
              className="shrink-0 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer"
            >
              Find My Stay
            </button>
          </div>

          {/* Emergency Contact List */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Emergency & Administration Contacts
            </div>

            {EMERGENCY_CONTACTS.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-stone-200 shadow-2xs mt-0.5">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{item.title}</h4>
                    <p className="text-[11px] text-stone-500">{item.tag}</p>
                    <div className="text-xs font-semibold text-orange-700 mt-0.5 tabular-nums">
                      {item.number}
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${item.number.split('/')[0].trim()}`}
                  className="px-3 py-1.5 bg-white border border-stone-300 hover:border-emerald-500 hover:text-emerald-700 text-stone-800 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Now</span>
                </a>
              </div>
            ))}
          </div>

          {/* Safety Advisory */}
          <div className="p-4 bg-stone-100 rounded-xl text-xs text-stone-600 space-y-1">
            <strong className="text-stone-900">Safety Tip for Snan Ghats:</strong>
            <p>
              Always keep your Kumbh Pass QR accessible offline. Drink only RO or sealed boiled water. Keep emergency helpline 112 bookmarked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
