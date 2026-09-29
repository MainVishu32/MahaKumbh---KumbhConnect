import React, { useState } from 'react';
import { ProviderListing, Booking } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  Shield,
  Home,
  QrCode,
  ArrowRight,
} from 'lucide-react';

interface BookingModalProps {
  listing: ProviderListing;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ listing, onClose }) => {
  const { submitBooking, setKumbhPassModalOpen } = useApp();

  const [checkInDate, setCheckInDate] = useState('2026-09-30');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-02');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [customerName, setCustomerName] = useState('Ashok Varma');
  const [customerPhone, setCustomerPhone] = useState('+91 98221 44556');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Nights calculation
  const d1 = new Date(checkInDate);
  const d2 = new Date(checkOutDate);
  const diffTime = Math.max(1000 * 60 * 60 * 24, d2.getTime() - d1.getTime());
  const nightsCount = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const pricePerNight = listing.basePrice;
  const totalPrice = pricePerNight * nightsCount * roomsCount;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking = submitBooking({
      providerId: listing.id,
      providerName: listing.providerName,
      providerPhone: listing.hostPhone,
      providerAddress: listing.location.address,
      areaName: listing.location.areaName,
      checkInDate,
      checkOutDate,
      guestsCount,
      roomsCount,
      roomType: listing.roomDetails?.roomType || 'Standard Room',
      totalNights: nightsCount,
      totalPrice,
      customerName,
      customerPhone,
      status: 'confirmed', // For hackathon/demo immediacy, confirmed right away
      lat: listing.location.lat,
      lng: listing.location.lng,
    });

    setConfirmedBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-bold text-base text-stone-900">
              {confirmedBooking ? 'Booking Confirmed!' : 'Book Stay Accommodation'}
            </h3>
            <p className="text-xs text-stone-500">{listing.providerName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-6 space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Reservation Confirmed
              </span>
              <h4 className="text-xl font-extrabold text-stone-900 mt-2">
                Booking ID #{confirmedBooking.bookingCode}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Your stay is officially registered with the host and connected to your <strong className="text-orange-600">My Kumbh Pass</strong>.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Provider & Stay:</span>
                <span className="font-bold text-stone-900">{confirmedBooking.providerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Address:</span>
                <span className="font-medium text-stone-800 text-right">{confirmedBooking.providerAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Dates:</span>
                <span className="font-medium text-stone-900">
                  {confirmedBooking.checkInDate} to {confirmedBooking.checkOutDate} ({confirmedBooking.totalNights} nights)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Guests & Room:</span>
                <span className="font-medium text-stone-900">
                  {confirmedBooking.guestsCount} Guests · {confirmedBooking.roomType}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Total Amount:</span>
                <span className="text-orange-600">₹{confirmedBooking.totalPrice}</span>
              </div>
            </div>

            {/* Digital Kumbh Pass Connection Banner */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-orange-600 text-white">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Added to My Kumbh Pass</div>
                  <div className="text-[11px] text-stone-600">If you get lost, help desks can scan your pass to locate this stay.</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setKumbhPassModalOpen(true);
                }}
                className="px-2.5 py-1.5 bg-white border border-stone-300 text-xs font-semibold rounded-lg hover:bg-stone-50 cursor-pointer"
              >
                View Pass
              </button>
            </div>

            {/* Host Contacts */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${confirmedBooking.providerPhone}`}
                className="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 font-semibold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-stone-50 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-stone-600" />
                <span>Call Host</span>
              </a>
              <a
                href={`https://wa.me/${confirmedBooking.providerPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-emerald-700 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleBookingSubmit} className="p-5 space-y-4">
            {/* Stay Dates */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-stone-700">Check-in Date</label>
                <input
                  type="date"
                  required
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="mt-1 w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700">Check-out Date</label>
                <input
                  type="date"
                  required
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="mt-1 w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-stone-700">Number of Guests</label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="mt-1 w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700">Rooms Required</label>
                <select
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(Number(e.target.value))}
                  className="mt-1 w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  {[1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Room' : 'Rooms'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room Info */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
              <div className="font-bold text-stone-900">{listing.roomDetails?.roomType || 'Standard Stay'}</div>
              <div className="text-stone-600">
                Rate: ₹{pricePerNight} / night · {nightsCount} nights stay
              </div>
              <div className="text-emerald-700 font-medium text-[11px]">
                🛡️ Verified Host · Cash on Arrival Accepted
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Primary Pilgrim Contact
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Price calculation & Submit */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-stone-500">Total Calculation:</div>
                <div className="text-lg font-black text-stone-900 tabular-nums">
                  ₹{totalPrice}
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 cursor-pointer transition-colors"
              >
                Send Booking Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
