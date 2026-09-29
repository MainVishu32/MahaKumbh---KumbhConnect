import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Utensils,
  Home,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  QrCode,
  ArrowRight,
} from 'lucide-react';

export const PilgrimBookingsOrders: React.FC<{ initialTab?: 'bookings' | 'orders' }> = ({
  initialTab = 'bookings',
}) => {
  const {
    bookings,
    orders,
    activeNavTab,
    setActiveNavTab,
    setKumbhPassModalOpen,
    t,
  } = useApp();

  const [currentTab, setCurrentTab] = React.useState<'bookings' | 'orders'>(
    activeNavTab === 'my-orders' ? 'orders' : 'bookings'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            My Kumbh Activity
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Track your verified stay reservations and home-cooked meal orders
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setCurrentTab('bookings')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              currentTab === 'bookings'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🏠 Stays ({bookings.length})
          </button>
          <button
            onClick={() => setCurrentTab('orders')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              currentTab === 'orders'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🍱 Food Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* Bookings View */}
      {currentTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((bk) => (
              <div
                key={bk.id}
                className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                        Booking #{bk.bookingCode}
                      </span>
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                        Confirmed
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mt-1">
                      {bk.providerName}
                    </h3>
                    <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{bk.providerAddress}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-extrabold text-stone-900 tabular-nums">
                      ₹{bk.totalPrice}
                    </div>
                    <div className="text-[10px] text-stone-400">Total for {bk.totalNights} nights</div>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-stone-50 rounded-xl text-xs">
                  <div>
                    <span className="text-stone-400 text-[11px]">Check-in Date:</span>
                    <div className="font-semibold text-stone-800">{bk.checkInDate}</div>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[11px]">Check-out Date:</span>
                    <div className="font-semibold text-stone-800">{bk.checkOutDate}</div>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[11px]">Room & Guests:</span>
                    <div className="font-semibold text-stone-800">{bk.guestsCount} Guests · {bk.roomType}</div>
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => setKumbhPassModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 hover:text-orange-800 cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View in My Kumbh Pass</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${bk.providerPhone}`}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-800 text-xs font-semibold flex items-center gap-1 hover:bg-stone-50 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-stone-600" />
                      <span>Call Host</span>
                    </a>
                    <a
                      href={`https://wa.me/${bk.providerPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-emerald-700 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white border border-stone-200 rounded-2xl">
              <Home className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-stone-800">No active bookings yet</div>
              <p className="text-xs text-stone-500 mt-1">
                Explore affordable verified homestays and rooms across Nashik.
              </p>
              <button
                onClick={() => setActiveNavTab('stay')}
                className="mt-3 px-4 py-2 bg-orange-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Find Stays
              </button>
            </div>
          )}
        </div>
      )}

      {/* Orders View */}
      {currentTab === 'orders' && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                        Order #{ord.orderNumber}
                      </span>
                      <span className="text-stone-700 bg-stone-100 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                        {ord.serviceMethod}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mt-1">
                      {ord.providerName}
                    </h3>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Placed {ord.createdAt} · Status: <strong className="text-emerald-700 capitalize">{ord.status.replace('_', ' ')}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-extrabold text-stone-900 tabular-nums">
                      ₹{ord.totalAmount}
                    </div>
                    <div className="text-[10px] text-stone-400">{ord.paymentMethod.replace(/_/g, ' ')}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1">
                  {ord.items.map((it) => (
                    <div key={it.menuItemId} className="flex justify-between text-stone-700">
                      <span>{it.quantity} × {it.name}</span>
                      <span className="font-semibold text-stone-900">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                  <span className="text-stone-500">
                    Prep time estimate: ~{ord.estimatedMinutes} mins
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${ord.providerPhone}`}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-800 text-xs font-semibold flex items-center gap-1 hover:bg-stone-50"
                    >
                      <Phone className="w-3.5 h-3.5 text-stone-600" />
                      <span>Call Host</span>
                    </a>
                    <a
                      href={`https://wa.me/${ord.providerPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-emerald-700"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white border border-stone-200 rounded-2xl">
              <Utensils className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-stone-800">No active food orders</div>
              <p className="text-xs text-stone-500 mt-1">
                Craving homemade Maharashtrian meals or hot tiffins?
              </p>
              <button
                onClick={() => setActiveNavTab('food')}
                className="mt-3 px-4 py-2 bg-orange-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Explore Food
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
