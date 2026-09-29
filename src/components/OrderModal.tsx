import React, { useState } from 'react';
import { ProviderListing, Order } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  Utensils,
  CreditCard,
  Truck,
  ShoppingBag,
} from 'lucide-react';

interface OrderModalProps {
  listing: ProviderListing;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ listing, onClose }) => {
  const { submitOrder, t } = useApp();

  // Quantities state
  const [quantities, setQuantities] = useState<{ [itemId: string]: number }>(() => {
    const initial: { [itemId: string]: number } = {};
    if (listing.menuItems && listing.menuItems.length > 0) {
      initial[listing.menuItems[0].id] = 1;
    }
    return initial;
  });

  const [serviceMethod, setServiceMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('Ashok Varma');
  const [customerPhone, setCustomerPhone] = useState('+91 98221 44556');
  const [paymentMethod, setPaymentMethod] = useState<'pay_at_pickup' | 'pay_on_delivery'>('pay_at_pickup');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const updateQuantity = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const menuItems = listing.menuItems || [];
  const selectedItems = menuItems
    .map((item) => ({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: quantities[item.id] || 0,
    }))
    .filter((i) => i.quantity > 0);

  const totalAmount = selectedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    const newOrder = submitOrder({
      providerId: listing.id,
      providerName: listing.providerName,
      providerPhone: listing.hostPhone,
      items: selectedItems,
      totalAmount,
      serviceMethod,
      deliveryAddress: serviceMethod === 'delivery' ? deliveryAddress : undefined,
      customerName,
      customerPhone,
      status: 'accepted',
      paymentMethod: serviceMethod === 'delivery' ? 'pay_on_delivery' : 'pay_at_pickup',
      estimatedMinutes: 20,
    });

    setConfirmedOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-bold text-base text-stone-900">
              {confirmedOrder ? 'Order Confirmed!' : 'Order Fresh Meal'}
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
        {confirmedOrder ? (
          <div className="p-6 space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Order Received by Host
              </span>
              <h4 className="text-xl font-extrabold text-stone-900 mt-2">
                Order #{confirmedOrder.orderNumber}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Estimated preparation & ready time: <strong className="text-stone-900">~{confirmedOrder.estimatedMinutes} minutes</strong>
              </p>
            </div>

            {/* Summary card */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs space-y-2">
              <div className="flex justify-between font-semibold text-stone-900">
                <span>Items Ordered:</span>
                <span>Qty</span>
              </div>
              {confirmedOrder.items.map((it) => (
                <div key={it.menuItemId} className="flex justify-between text-stone-600">
                  <span>{it.name}</span>
                  <span className="font-medium text-stone-900">{it.quantity} × ₹{it.price}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Total Amount:</span>
                <span>₹{confirmedOrder.totalAmount}</span>
              </div>
              <div className="text-[11px] text-stone-500 pt-1">
                Payment Method: <span className="font-semibold text-stone-700">{confirmedOrder.paymentMethod === 'pay_on_delivery' ? 'Pay on Delivery' : 'Pay at Pickup'}</span>
              </div>
            </div>

            {/* Contact Host Direct */}
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs text-left">
              <div className="font-bold text-stone-900 mb-1">Direct Provider Contact:</div>
              <div className="text-stone-600 mb-3">{listing.providerName} ({listing.hostPhone})</div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${listing.hostPhone}`}
                  className="py-2 px-3 rounded-lg bg-white border border-stone-300 text-stone-800 font-semibold text-center flex items-center justify-center gap-1.5 cursor-pointer hover:bg-stone-50"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-600" />
                  <span>Call Provider</span>
                </a>
                <a
                  href={`https://wa.me/${listing.hostPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-lg bg-emerald-600 text-white font-semibold text-center flex items-center justify-center gap-1.5 cursor-pointer hover:bg-emerald-700"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs cursor-pointer"
            >
              Done / Return to Marketplace
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handlePlaceOrder} className="p-5 space-y-5">
            {/* Step 1: Select Meals & Quantities */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                1. Select Meals & Quantities
              </label>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {menuItems.map((item) => {
                  const qty = quantities[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between"
                    >
                      <div className="pr-3">
                        <div className="text-xs font-bold text-stone-900">{item.name}</div>
                        <div className="text-xs font-semibold text-orange-700">₹{item.price}</div>
                        <div className="text-[10px] text-stone-500">{item.description}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer disabled:opacity-40"
                          disabled={qty === 0}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pickup vs Delivery */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                2. Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setServiceMethod('pickup');
                    setPaymentMethod('pay_at_pickup');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceMethod === 'pickup'
                      ? 'border-orange-500 bg-orange-50/60 ring-1 ring-orange-500'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                    <span>Self Pickup</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Collect from host in {listing.location.areaName}</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setServiceMethod('delivery');
                    setPaymentMethod('pay_on_delivery');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceMethod === 'delivery'
                      ? 'border-orange-500 bg-orange-50/60 ring-1 ring-orange-500'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                    <Truck className="w-4 h-4 text-orange-600" />
                    <span>Dharamshala / Ghat Delivery</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Delivered by local runner</div>
                </button>
              </div>

              {serviceMethod === 'delivery' && (
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter Dharamshala name, camp number, or ghat spot..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                3. Pilgrim Contact
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Step 4: Payment Simulation */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                4. Payment Option
              </label>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                    <input
                      type="radio"
                      name="payment"
                      checked={true}
                      readOnly
                      className="accent-orange-600"
                    />
                    <span>{serviceMethod === 'delivery' ? 'Pay on Delivery (Cash/UPI to runner)' : 'Pay at Pickup (Cash/Direct)'}</span>
                  </label>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <label className="flex items-center gap-2 cursor-not-allowed">
                    <input type="radio" name="payment" disabled />
                    <span>Online UPI Gateway</span>
                  </label>
                  <span className="text-[10px] text-stone-500 bg-stone-200 px-1.5 py-0.5 rounded">Coming Soon</span>
                </div>
              </div>
            </div>

            {/* Price & Submit Button */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-stone-500">Order Total:</div>
                <div className="text-lg font-black text-stone-900 tabular-nums">
                  ₹{totalAmount}
                </div>
              </div>

              <button
                type="submit"
                disabled={totalAmount === 0}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 cursor-pointer transition-colors"
              >
                Confirm & Place Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
