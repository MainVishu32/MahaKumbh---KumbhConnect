import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  Home,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  Plus,
  Phone,
  MessageSquare,
  Pause,
  Play,
  Trash2,
  AlertCircle,
  Eye,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { ProviderListing } from '../types';

export const ProviderDashboard: React.FC = () => {
  const {
    listings,
    orders,
    bookings,
    updateOrderStatus,
    updateBookingStatus,
    toggleListingActive,
    addProviderListing,
    setSelectedListing,
  } = useApp();

  const [providerTab, setProviderTab] = useState<'overview' | 'listings' | 'orders' | 'bookings' | 'earnings'>('overview');
  const [showAddListingModal, setShowAddListingModal] = useState(false);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'food' | 'stay'>('food');
  const [newPrice, setNewPrice] = useState(80);
  const [newArea, setNewArea] = useState('Panchavati');
  const [newDescription, setNewDescription] = useState('');

  // Provider's own listings (demo filtered to first 2 providers: food-1 and stay-1)
  const myListings = listings.filter((l) => l.id === 'food-1' || l.id === 'stay-1' || l.id.startsWith('food-') || l.id.startsWith('stay-'));

  const pendingOrders = orders.filter((o) => o.status === 'accepted' || o.status === 'pending');
  const pendingBookings = bookings.filter((b) => b.status === 'pending_provider_approval' || b.status === 'confirmed');

  const totalEarnings = 14850;

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    addProviderListing({
      providerName: 'Maa Ganga Home Kitchen & Rooms',
      hostName: 'Sunita Joshi',
      hostPhone: '+91 98230 44120',
      category: newType === 'food' ? 'food_home' : 'stay_homestay',
      type: newType,
      title: newTitle,
      description: newDescription,
      shortDescription: newDescription.slice(0, 80) + '...',
      location: {
        lat: 20.0078,
        lng: 73.7928,
        areaName: newArea,
        address: `${newArea}, Nashik`,
        distanceKm: 0.5,
      },
      priceDisplay: `₹${newPrice} / ${newType === 'food' ? 'meal' : 'night'}`,
      basePrice: newPrice,
      priceUnit: newType === 'food' ? 'meal' : 'night',
      typicalMinPrice: newType === 'food' ? 70 : 600,
      typicalMaxPrice: newType === 'food' ? 120 : 1200,
      rating: 5.0,
      reviewCount: 1,
      verificationLevel: 'provider_verified',
      verificationBadgeText: 'Provider Verified',
      images: [newType === 'food' ? '/src/assets/images/food_thali_homemade_1790698491914.jpg' : '/src/assets/images/homestay_nashik_room_1790698503364.jpg'],
      availableNow: true,
      status: 'active',
      isVegetarian: true,
    });
    setShowAddListingModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 text-orange-400 text-xs font-semibold mb-2">
            <span>🛡️ Verified Nashik Host</span>
            <span>·</span>
            <span>ID: MH-NSK-HOST-2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, Sunita Joshi
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Managing <strong className="text-white">Maa Ganga Home Kitchen</strong> · Serving pilgrims at Panchavati Ghats
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddListingModal(true)}
            className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Listing</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-stone-500">Active Listings</div>
          <div className="text-2xl font-black text-stone-900 mt-1 tabular-nums">
            {myListings.filter((l) => l.status === 'active').length}
          </div>
          <div className="text-[11px] text-emerald-700 mt-0.5">● Ready to accept</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-stone-500">Today's Orders</div>
          <div className="text-2xl font-black text-orange-600 mt-1 tabular-nums">
            {orders.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">{pendingOrders.length} in preparation</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-stone-500">Stay Bookings</div>
          <div className="text-2xl font-black text-stone-900 mt-1 tabular-nums">
            {bookings.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">Confirmed check-ins</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-stone-500">Total Earnings</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 tabular-nums">
            ₹{totalEarnings.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">Direct to bank / cash</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs col-span-2 lg:col-span-1">
          <div className="text-xs font-semibold text-stone-500">Host Rating</div>
          <div className="text-2xl font-black text-stone-900 mt-1 flex items-center gap-1 tabular-nums">
            <span>4.9</span>
            <Star className="w-5 h-5 fill-amber-500 text-amber-500 inline" />
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">From 142 pilgrim reviews</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 space-x-6 text-sm font-semibold">
        {(['overview', 'listings', 'orders', 'bookings', 'earnings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setProviderTab(tab)}
            className={`pb-3 capitalize transition-colors cursor-pointer ${
              providerTab === tab
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content 1: Overview & Active Orders */}
      {providerTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Orders Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                Incoming Food Orders
              </h3>
              <span className="text-xs text-stone-500">{orders.length} total orders</span>
            </div>

            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-xl border border-stone-200 bg-white shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                        <span>Order #{ord.orderNumber}</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                          {ord.serviceMethod === 'delivery' ? 'Delivery' : 'Pickup'}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Customer: <strong className="text-stone-800">{ord.customerName}</strong> ({ord.customerPhone})
                      </div>
                      {ord.deliveryAddress && (
                        <div className="text-xs text-stone-600 mt-0.5">
                          Delivery to: {ord.deliveryAddress}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-extrabold text-stone-900 tabular-nums">
                        ₹{ord.totalAmount}
                      </div>
                      <div className="text-[10px] text-stone-400">{ord.createdAt}</div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-2.5 bg-stone-50 rounded-lg text-xs space-y-1">
                    {ord.items.map((it) => (
                      <div key={it.menuItemId} className="flex justify-between text-stone-700">
                        <span>{it.quantity} × {it.name}</span>
                        <span className="font-semibold">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${ord.customerPhone}`}
                        className="p-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        title="WhatsApp Customer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {ord.status !== 'completed' ? (
                        <>
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'ready_for_pickup')}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg cursor-pointer"
                          >
                            Mark Ready
                          </button>
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'completed')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
                          >
                            Complete Order
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Bookings Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                Accommodation Bookings
              </h3>
              <span className="text-xs text-stone-500">{bookings.length} reservations</span>
            </div>

            <div className="space-y-3">
              {bookings.map((bk) => (
                <div
                  key={bk.id}
                  className="p-4 rounded-xl border border-stone-200 bg-white shadow-xs space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        Booking #{bk.bookingCode}
                      </div>
                      <div className="text-xs text-stone-600 mt-0.5">
                        Guest: <strong className="text-stone-900">{bk.customerName}</strong> ({bk.customerPhone})
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Dates: {bk.checkInDate} to {bk.checkOutDate} ({bk.totalNights} nights)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-stone-900">₹{bk.totalPrice}</div>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Confirmed
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-600">{bk.guestsCount} Guests · {bk.roomType}</span>
                    <a
                      href={`tel:${bk.customerPhone}`}
                      className="px-2.5 py-1 rounded bg-stone-100 text-stone-800 font-semibold hover:bg-stone-200 cursor-pointer flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: My Listings */}
      {providerTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900">Manage Your Offerings</h3>
            <button
              onClick={() => setShowAddListingModal(true)}
              className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              + Create Listing
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myListings.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white border border-stone-200 rounded-xl space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-orange-600">
                      {item.type === 'food' ? '🍱 Food' : '🏠 Stay'}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
                    <p className="text-xs text-stone-500">{item.location.areaName}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.status === 'active'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <div className="text-sm font-bold text-stone-900">
                  ₹{item.basePrice} / {item.priceUnit}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleListingActive(item.id)}
                    className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                  >
                    {item.status === 'active' ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedListing(item)}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3 & 4: Orders & Bookings Full List */}
      {(providerTab === 'orders' || providerTab === 'bookings') && (
        <div className="p-6 bg-white border border-stone-200 rounded-xl">
          <h3 className="font-bold text-sm text-stone-900 mb-3 capitalize">
            All {providerTab}
          </h3>
          <p className="text-xs text-stone-500">
            Real-time notifications trigger SMS and WhatsApp alerts to host phone (+91 98230 44120).
          </p>
        </div>
      )}

      {/* Tab Content 5: Earnings */}
      {providerTab === 'earnings' && (
        <div className="p-6 bg-white border border-stone-200 rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-stone-900">Kumbh Mela Livelihood Insights</h3>
              <p className="text-xs text-stone-500">Direct household revenue generated without commission cuts</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-emerald-700">₹{totalEarnings.toLocaleString('en-IN')}</div>
              <div className="text-xs text-stone-500">Last 7 days</div>
            </div>
          </div>

          {/* Simple Clean Bar Graph Representation */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-700">Daily Revenue Breakdown (₹)</div>
            <div className="grid grid-cols-7 gap-2 items-end h-40 pt-4 border-b border-stone-200">
              {[
                { day: 'Wed', val: 1200 },
                { day: 'Thu', val: 1850 },
                { day: 'Fri', val: 2400 },
                { day: 'Sat', val: 3200 },
                { day: 'Sun', val: 3800 },
                { day: 'Mon', val: 1400 },
                { day: 'Today', val: 1000 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-[10px] font-bold text-stone-700 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{item.val}
                  </span>
                  <div
                    className="w-full max-w-[36px] bg-orange-500 group-hover:bg-orange-600 rounded-t-md transition-all"
                    style={{ height: `${(item.val / 4000) * 100}%` }}
                  />
                  <span className="text-[10px] text-stone-500 mt-2">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Listing Modal */}
      {showAddListingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <h3 className="font-bold text-sm text-stone-900">Add New Offering</h3>
              <button onClick={() => setShowAddListingModal(false)} className="text-stone-400 hover:text-stone-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Service Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('food')}
                    className={`py-2 rounded-lg border font-semibold ${
                      newType === 'food' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-stone-200'
                    }`}
                  >
                    🍱 Food / Meal
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('stay')}
                    className={`py-2 rounded-lg border font-semibold ${
                      newType === 'stay' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-stone-200'
                    }`}
                  >
                    🏠 Room / Stay
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharashtrian Lunch Thali or Quiet Courtyard Room"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2 border border-stone-300 rounded-lg bg-stone-50"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Nashik Area</label>
                  <select
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-lg bg-stone-50"
                  >
                    <option value="Panchavati">Panchavati</option>
                    <option value="Ram Kund">Ram Kund</option>
                    <option value="Tapovan">Tapovan</option>
                    <option value="CBS">CBS</option>
                    <option value="Gangapur Road">Gangapur Road</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe your hygiene, food preparation, or room features..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg bg-stone-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddListingModal(false)}
                  className="px-3 py-1.5 border border-stone-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-orange-600 text-white font-semibold rounded-lg shadow-xs"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
