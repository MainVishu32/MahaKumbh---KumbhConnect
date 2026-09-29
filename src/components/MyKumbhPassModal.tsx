import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  QrCode,
  Shield,
  Phone,
  MapPin,
  HeartHandshake,
  AlertTriangle,
  User,
  Compass,
  CheckCircle2,
  Navigation,
  ExternalLink,
} from 'lucide-react';

export const MyKumbhPassModal: React.FC = () => {
  const {
    kumbhPass,
    kumbhPassModalOpen,
    setKumbhPassModalOpen,
    lostStayFinderOpen,
    setLostStayFinderOpen,
    bookings,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pass' | 'lost_demo'>('pass');
  const [scanSimulated, setScanSimulated] = useState(false);

  const registeredStay = kumbhPass.registeredBooking || bookings[0];

  if (!kumbhPassModalOpen && !lostStayFinderOpen) return null;

  const handleClose = () => {
    setKumbhPassModalOpen(false);
    setLostStayFinderOpen(false);
    setScanSimulated(false);
  };

  const showLostView = lostStayFinderOpen || activeTab === 'lost_demo';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
              KP
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                {showLostView ? 'Lost Pilgrim Help Desk' : 'Digital Kumbh Pass'}
              </h3>
              <p className="text-[11px] text-stone-500">Nashik Mela Civic Safety System</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-stone-100 border-b border-stone-200 text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('pass');
              setLostStayFinderOpen(false);
            }}
            className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
              !showLostView
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🎫 Pilgrim Pass & QR
          </button>
          <button
            onClick={() => {
              setActiveTab('lost_demo');
              setLostStayFinderOpen(true);
            }}
            className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
              showLostView
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 hover:text-rose-900'
            }`}
          >
            🆘 Lost? Find My Stay
          </button>
        </div>

        {/* TAB 1: DIGITAL PASS */}
        {!showLostView ? (
          <div className="p-6 space-y-5">
            {/* The Badge Identity Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 text-white shadow-lg space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-orange-200">
                    Nashik Kumbh Mela 2026
                  </div>
                  <div className="text-lg font-black tracking-tight">{kumbhPass.pilgrimName}</div>
                  <div className="text-xs text-orange-100">{kumbhPass.pilgrimPhone} · Blood: {kumbhPass.bloodGroup}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/25 text-white">
                    {kumbhPass.passId}
                  </span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="p-3 bg-white rounded-xl text-stone-900 flex flex-col items-center justify-center">
                {/* Clean SVG Mock QR */}
                <svg className="w-36 h-36" viewBox="0 0 120 120" fill="currentColor">
                  {/* Outer Frame & Finder patterns */}
                  <rect x="10" y="10" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="15" y="15" width="20" height="20" fill="white" />
                  <rect x="19" y="19" width="12" height="12" fill="#ea580c" />

                  <rect x="80" y="10" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="85" y="15" width="20" height="20" fill="white" />
                  <rect x="89" y="19" width="12" height="12" fill="#ea580c" />

                  <rect x="10" y="80" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="15" y="85" width="20" height="20" fill="white" />
                  <rect x="19" y="89" width="12" height="12" fill="#ea580c" />

                  {/* Simulated matrix pixels */}
                  <rect x="48" y="12" width="6" height="6" fill="#0f172a" />
                  <rect x="58" y="12" width="6" height="6" fill="#0f172a" />
                  <rect x="68" y="18" width="6" height="6" fill="#0f172a" />
                  <rect x="48" y="28" width="6" height="6" fill="#0f172a" />
                  <rect x="60" y="28" width="6" height="6" fill="#0f172a" />
                  <rect x="14" y="48" width="6" height="6" fill="#0f172a" />
                  <rect x="28" y="48" width="6" height="6" fill="#0f172a" />
                  <rect x="48" y="48" width="6" height="6" fill="#ea580c" />
                  <rect x="60" y="48" width="6" height="6" fill="#0f172a" />
                  <rect x="74" y="48" width="6" height="6" fill="#0f172a" />
                  <rect x="90" y="48" width="6" height="6" fill="#0f172a" />
                  <rect x="48" y="60" width="6" height="6" fill="#0f172a" />
                  <rect x="62" y="60" width="6" height="6" fill="#ea580c" />
                  <rect x="76" y="60" width="6" height="6" fill="#0f172a" />
                  <rect x="92" y="60" width="6" height="6" fill="#0f172a" />
                  <rect x="48" y="74" width="6" height="6" fill="#0f172a" />
                  <rect x="64" y="74" width="6" height="6" fill="#0f172a" />
                  <rect x="80" y="80" width="6" height="6" fill="#0f172a" />
                  <rect x="94" y="80" width="6" height="6" fill="#0f172a" />
                  <rect x="80" y="94" width="6" height="6" fill="#0f172a" />
                  <rect x="94" y="94" width="6" height="6" fill="#ea580c" />
                  <rect x="48" y="94" width="6" height="6" fill="#0f172a" />
                  <rect x="62" y="94" width="6" height="6" fill="#0f172a" />
                </svg>
                <div className="text-[10px] text-stone-500 font-medium mt-1">
                  Scan at any Kumbh Help Desk or Police Booth
                </div>
              </div>

              {/* Registered Stay Info on Card */}
              <div className="pt-2 border-t border-orange-400/40 text-xs flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-orange-200">Registered Stay:</div>
                  <div className="font-bold">{registeredStay ? registeredStay.providerName : 'Not booked yet'}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-orange-200">Emergency Kin:</div>
                  <div className="font-bold">{kumbhPass.emergencyContactPhone}</div>
                </div>
              </div>
            </div>

            {/* Explanatory Note */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Kumbh Safety Wristband Companion</span>
              </div>
              <p>
                In case you become separated from your group, show this QR code to any Kumbh Police volunteer or Help Desk. They will instantly identify your verified stay location and emergency contacts.
              </p>
            </div>

            {/* Quick Lost Simulator Button */}
            <button
              onClick={() => {
                setActiveTab('lost_demo');
                setLostStayFinderOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs hover:bg-rose-100 cursor-pointer transition-colors"
            >
              Demo: Simulate "Lost Pilgrim — Find My Stay"
            </button>
          </div>
        ) : (
          /* TAB 2: LOST PILGRIM WORKFLOW */
          <div className="p-6 space-y-5">
            {!scanSimulated ? (
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-7 h-7" />
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-stone-900">
                    Are you separated or lost in Kumbh?
                  </h4>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto mt-1">
                    Tap below to simulate scanning your pass or retrieving your registered safe stay in Nashik.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs space-y-2">
                  <div className="font-semibold text-stone-900">Pilgrim ID: {kumbhPass.passId}</div>
                  <div className="text-stone-600">Pilgrim: {kumbhPass.pilgrimName} ({kumbhPass.homeCity})</div>
                  <div className="text-stone-600">Emergency Phone: {kumbhPass.emergencyContactPhone}</div>
                </div>

                <button
                  onClick={() => setScanSimulated(true)}
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Retrieve My Stay & Directions</span>
                </button>
              </div>
            ) : (
              /* Retrieved Verified Stay Screen */
              <div className="space-y-4 animate-in fade-in">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Your registered stay has been located!</span>
                </div>

                {registeredStay ? (
                  <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs space-y-3">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                        Registered Accommodation
                      </div>
                      <h4 className="text-base font-extrabold text-stone-900">
                        {registeredStay.providerName}
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {registeredStay.providerAddress}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-stone-100">
                      <div>
                        <span className="text-stone-500">Area:</span>
                        <div className="font-bold text-stone-800">{registeredStay.areaName}</div>
                      </div>
                      <div>
                        <span className="text-stone-500">Booking ID:</span>
                        <div className="font-mono font-bold text-stone-800">{registeredStay.bookingCode}</div>
                      </div>
                    </div>

                    {/* Immediate Directions & Action Buttons */}
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          registeredStay.providerName + ' ' + registeredStay.providerAddress
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Open Directions to Stay</span>
                      </a>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`tel:${registeredStay.providerPhone}`}
                          className="py-2 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-stone-600" />
                          <span>Call Host</span>
                        </a>

                        <a
                          href="tel:02532311222"
                          className="py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <HeartHandshake className="w-3.5 h-3.5" />
                          <span>Kumbh Help Desk</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-stone-500 text-center py-4">
                    No active stay registered yet. Explore stays on the map to register your location.
                  </div>
                )}

                <button
                  onClick={() => setScanSimulated(false)}
                  className="w-full py-2 text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  Reset Demo
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
