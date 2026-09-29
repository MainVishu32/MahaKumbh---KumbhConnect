import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  TrendingUp,
  MapPin,
  Users,
  Search,
  Check,
  Ban,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { ProviderListing, ReportItem } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    listings,
    reports,
    orders,
    bookings,
    approveProvider,
    rejectProvider,
    suspendListing,
    setSelectedListing,
  } = useApp();

  const [adminTab, setAdminTab] = useState<'queue' | 'reports' | 'price_watch' | 'analytics'>('queue');
  const [filterQuery, setFilterQuery] = useState('');

  // Statistics
  const totalProviders = listings.length;
  const verifiedProviders = listings.filter((l) => l.verificationLevel === 'provider_verified').length;
  const pendingVerification = listings.filter((l) => l.verificationLevel === 'identity_submitted' || l.verificationLevel === 'pending').length;
  const reportedListings = reports.filter((r) => r.status === 'pending_review');

  // Listings with high price anomalies
  const priceAnomalies = listings.filter((l) => l.basePrice > l.typicalMaxPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 text-emerald-400 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Nashik Civic Administration Portal · Kumbh 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Verification & Safety Console
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Monitoring fair pricing, authentic local identity verification, and pilgrim safety.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Sentinel Active</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white border border-stone-200 rounded-xl">
          <div className="text-xs font-semibold text-stone-500">Total Providers</div>
          <div className="text-2xl font-black text-stone-900 mt-1 tabular-nums">{totalProviders}</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl">
          <div className="text-xs font-semibold text-stone-500">Verified Providers</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 tabular-nums">{verifiedProviders}</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl">
          <div className="text-xs font-semibold text-stone-500">Pending Review</div>
          <div className="text-2xl font-black text-amber-600 mt-1 tabular-nums">{pendingVerification}</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl">
          <div className="text-xs font-semibold text-stone-500">Open Reports</div>
          <div className="text-2xl font-black text-rose-600 mt-1 tabular-nums">{reportedListings.length}</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl">
          <div className="text-xs font-semibold text-stone-500">Price Anomalies</div>
          <div className="text-2xl font-black text-orange-600 mt-1 tabular-nums">{priceAnomalies.length}</div>
        </div>

        <div className="p-4 bg-white border border-stone-200 rounded-xl">
          <div className="text-xs font-semibold text-stone-500">Total Bookings</div>
          <div className="text-2xl font-black text-stone-900 mt-1 tabular-nums">{bookings.length + orders.length}</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-stone-200 space-x-6 text-sm font-semibold">
        <button
          onClick={() => setAdminTab('queue')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
            adminTab === 'queue'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <span>Verification Queue</span>
          {pendingVerification > 0 && (
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
              {pendingVerification}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('reports')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
            adminTab === 'reports'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <span>Reported Listings</span>
          {reportedListings.length > 0 && (
            <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full">
              {reportedListings.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('price_watch')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
            adminTab === 'price_watch'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <span>Price Watch Monitor</span>
          <span className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.2 rounded-full">
            {priceAnomalies.length}
          </span>
        </button>

        <button
          onClick={() => setAdminTab('analytics')}
          className={`pb-3 transition-colors cursor-pointer ${
            adminTab === 'analytics'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Geographic Analytics
        </button>
      </div>

      {/* TAB 1: VERIFICATION QUEUE */}
      {adminTab === 'queue' && (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900">Provider Document Verification</h3>
              <p className="text-xs text-stone-500">
                Verify phone confirmation and submitted identity documents before activating badge
              </p>
            </div>
            <span className="text-xs text-stone-500">{listings.length} registered providers</span>
          </div>

          <div className="divide-y divide-stone-100">
            {listings.map((provider) => (
              <div
                key={provider.id}
                className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{provider.providerName}</span>
                    <span className="text-[10px] font-semibold text-stone-500">
                      Host: {provider.hostName} ({provider.hostPhone})
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded uppercase font-semibold bg-stone-100 text-stone-700">
                      {provider.type}
                    </span>
                  </div>

                  <div className="text-xs text-stone-600 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{provider.location.areaName}</span>
                    <span>·</span>
                    <span className="text-stone-500">{provider.location.address}</span>
                  </div>

                  <div className="text-[11px] text-stone-500 flex items-center gap-2 pt-0.5">
                    <FileText className="w-3 h-3 text-stone-400" />
                    <span>Submitted Document: <strong>{provider.idDocumentType || 'Pending ID submission'}</strong></span>
                    {provider.idDocumentNumberMasked && (
                      <span className="font-mono text-stone-600">({provider.idDocumentNumberMasked})</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {provider.verificationLevel === 'provider_verified' ? (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Provider</span>
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => approveProvider(provider.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Verify</span>
                      </button>

                      <button
                        onClick={() => rejectProvider(provider.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setSelectedListing(provider)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: REPORTED LISTINGS */}
      {adminTab === 'reports' && (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-stone-200 bg-stone-50">
            <h3 className="text-sm font-bold text-stone-900">Pilgrim Reports & Safety Flags</h3>
            <p className="text-xs text-stone-500">
              Community grievance redressal for price gouging, false photos, or unsafe locations
            </p>
          </div>

          <div className="divide-y divide-stone-100">
            {reports.map((rep) => (
              <div key={rep.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">{rep.listingTitle}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                        {rep.reason}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Provider: <strong className="text-stone-800">{rep.providerName}</strong> · Reported by: {rep.reportedBy} ({rep.reportedAt})
                    </div>
                  </div>

                  <span className="text-xs font-semibold uppercase text-stone-500">
                    {rep.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  "{rep.details}"
                </p>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => suspendListing(rep.listingId)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Suspend Listing</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRICE WATCH ANOMALY MONITOR */}
      {adminTab === 'price_watch' && (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs space-y-4 p-5">
          <div>
            <h3 className="text-sm font-bold text-stone-900">Kumbh Price Gouging Radar</h3>
            <p className="text-xs text-stone-500">
              Listings where provider prices exceed typical local benchmarks during mela peak hours
            </p>
          </div>

          <div className="space-y-3">
            {priceAnomalies.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{item.providerName}</span>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      ⚠️ Above Market Cap
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    Quoted: <strong className="text-rose-700">₹{item.basePrice}</strong> / {item.priceUnit} (Typical local range is ₹{item.typicalMinPrice}–₹{item.typicalMaxPrice})
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Location: {item.location.areaName} · {item.reportedCount} pilgrim flags
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => suspendListing(item.id)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                  >
                    Suspend & Warn Host
                  </button>
                </div>
              </div>
            ))}

            {priceAnomalies.length === 0 && (
              <div className="text-center py-8 text-xs text-stone-500">
                ✓ All active provider rates are within standard fair pricing parameters!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: GEOGRAPHIC DISTRIBUTION */}
      {adminTab === 'analytics' && (
        <div className="p-6 bg-white border border-stone-200 rounded-xl space-y-5">
          <div>
            <h3 className="text-base font-bold text-stone-900">Geographic Distribution around Nashik</h3>
            <p className="text-xs text-stone-500">
              Provider concentration vs pilgrim demand zones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { area: 'Panchavati (Near Kalaram)', count: 9, stays: 4, food: 5, crowd: 'High' },
              { area: 'Ram Kund (Ghats)', count: 5, stays: 2, food: 3, crowd: 'High' },
              { area: 'Tapovan (Sadhugram)', count: 7, stays: 4, food: 3, crowd: 'Moderate' },
              { area: 'CBS / Ashok Stambh', count: 6, stays: 3, food: 3, crowd: 'Moderate' },
              { area: 'Gangapur Road', count: 4, stays: 2, food: 2, crowd: 'Low' },
              { area: 'Nashik Road Station', count: 5, stays: 2, food: 3, crowd: 'Moderate' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-stone-900">{stat.area}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      stat.crowd === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : stat.crowd === 'Moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {stat.crowd} Crowd
                  </span>
                </div>
                <div className="text-lg font-black text-stone-900">{stat.count} Providers</div>
                <div className="text-xs text-stone-500">
                  🍱 {stat.food} Food Kitchens · 🏠 {stat.stays} Stays
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
