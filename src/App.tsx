import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { PilgrimExplorer } from './components/PilgrimExplorer';
import { PilgrimBookingsOrders } from './components/PilgrimBookingsOrders';
import { ProviderDashboard } from './components/ProviderDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ProviderDetailModal } from './components/ProviderDetailModal';
import { OrderModal } from './components/OrderModal';
import { BookingModal } from './components/BookingModal';
import { ReportModal } from './components/ReportModal';
import { MyKumbhPassModal } from './components/MyKumbhPassModal';
import { SafetyHubModal } from './components/SafetyHubModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const {
    userRole,
    activeNavTab,
    setActiveNavTab,
    filters,
    setFilters,
    selectedListing,
    setSelectedListing,
    orderModalListing,
    setOrderModalListing,
    bookingModalListing,
    setBookingModalListing,
    reportModalListing,
    setReportModalListing,
    t,
  } = useApp();

  // Sync category or type when tab changes
  useEffect(() => {
    if (activeNavTab === 'food') {
      setFilters((prev) => ({ ...prev, typeFilter: 'food' }));
    } else if (activeNavTab === 'stay') {
      setFilters((prev) => ({ ...prev, typeFilter: 'stay' }));
    }
  }, [activeNavTab, setFilters]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {userRole === 'provider' ? (
          <ProviderDashboard />
        ) : userRole === 'admin' ? (
          <AdminDashboard />
        ) : (
          /* Pilgrim Views */
          <div>
            {activeNavTab === 'explore' && <LandingHero />}

            {activeNavTab === 'explore' || activeNavTab === 'food' || activeNavTab === 'stay' ? (
              <PilgrimExplorer />
            ) : activeNavTab === 'my-bookings' || activeNavTab === 'my-orders' ? (
              <PilgrimBookingsOrders />
            ) : (
              <PilgrimExplorer />
            )}
          </div>
        )}
      </main>

      {/* Persistent Modals */}
      {selectedListing && (
        <ProviderDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onOrderMeal={(l) => {
            setSelectedListing(null);
            setOrderModalListing(l);
          }}
          onBookStay={(l) => {
            setSelectedListing(null);
            setBookingModalListing(l);
          }}
        />
      )}

      {orderModalListing && (
        <OrderModal
          listing={orderModalListing}
          onClose={() => setOrderModalListing(null)}
        />
      )}

      {bookingModalListing && (
        <BookingModal
          listing={bookingModalListing}
          onClose={() => setBookingModalListing(null)}
        />
      )}

      {reportModalListing && (
        <ReportModal
          listing={reportModalListing}
          onClose={() => setReportModalListing(null)}
        />
      )}

      <MyKumbhPassModal />
      <SafetyHubModal />

      {/* Mobile Navigation */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />

      {/* Fixed Demo Mode Indicator */}
      <div className="hidden sm:flex fixed bottom-3 left-4 z-30 bg-stone-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[11px] font-semibold items-center gap-2 shadow-lg border border-stone-700">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        <span>KumbhConnect Nashik Demo Mode Active</span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
