import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  ProviderListing,
  FilterState,
  Order,
  Booking,
  ReportItem,
  KumbhPass,
} from '../types';
import {
  MOCK_PROVIDERS,
  MOCK_ORDERS,
  MOCK_BOOKINGS,
  MOCK_REPORTS,
} from '../data/mockData';
import { translations } from '../locales/translations';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  lowBandwidth: boolean;
  setLowBandwidth: (val: boolean) => void;
  t: (key: keyof typeof translations['en']) => string;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  
  // Data
  listings: ProviderListing[];
  orders: Order[];
  bookings: Booking[];
  reports: ReportItem[];
  kumbhPass: KumbhPass;
  
  // Filter state
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Modals & Active Selections
  selectedListing: ProviderListing | null;
  setSelectedListing: (item: ProviderListing | null) => void;
  orderModalListing: ProviderListing | null;
  setOrderModalListing: (item: ProviderListing | null) => void;
  bookingModalListing: ProviderListing | null;
  setBookingModalListing: (item: ProviderListing | null) => void;
  reportModalListing: ProviderListing | null;
  setReportModalListing: (item: ProviderListing | null) => void;
  
  safetyModalOpen: boolean;
  setSafetyModalOpen: (open: boolean) => void;
  kumbhPassModalOpen: boolean;
  setKumbhPassModalOpen: (open: boolean) => void;
  lostStayFinderOpen: boolean;
  setLostStayFinderOpen: (open: boolean) => void;
  
  // Actions
  submitOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  submitBooking: (booking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  submitReport: (report: Omit<ReportItem, 'id' | 'reportedAt' | 'status'>) => void;
  approveProvider: (providerId: string) => void;
  rejectProvider: (providerId: string) => void;
  suspendListing: (listingId: string) => void;
  toggleListingActive: (listingId: string) => void;
  addProviderListing: (listing: Omit<ProviderListing, 'id' | 'registrationDate' | 'reportedCount'>) => void;
  
  // Saved Favorites
  savedFavorites: string[];
  toggleFavorite: (listingId: string) => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  typeFilter: 'all',
  categoryFilter: 'all',
  maxDistanceKm: 10,
  foodPreference: 'all',
  priceRangeFood: 'all',
  priceRangeStay: 'all',
  minRating: 0,
  verifiedOnly: false,
  availableOnly: false,
  areaFilter: 'all',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('pilgrim');
  const [language, setLanguage] = useState<Language>('en');
  const [lowBandwidth, setLowBandwidth] = useState<boolean>(false);
  const [activeNavTab, setActiveNavTab] = useState<string>('explore');
  
  const [listings, setListings] = useState<ProviderListing[]>(MOCK_PROVIDERS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [reports, setReports] = useState<ReportItem[]>(MOCK_REPORTS);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(['stay-1', 'food-1']);
  
  // Modals
  const [selectedListing, setSelectedListing] = useState<ProviderListing | null>(null);
  const [orderModalListing, setOrderModalListing] = useState<ProviderListing | null>(null);
  const [bookingModalListing, setBookingModalListing] = useState<ProviderListing | null>(null);
  const [reportModalListing, setReportModalListing] = useState<ProviderListing | null>(null);
  const [safetyModalOpen, setSafetyModalOpen] = useState<boolean>(false);
  const [kumbhPassModalOpen, setKumbhPassModalOpen] = useState<boolean>(false);
  const [lostStayFinderOpen, setLostStayFinderOpen] = useState<boolean>(false);
  
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Digital Kumbh Pass State
  const [kumbhPass, setKumbhPass] = useState<KumbhPass>({
    passId: 'KP-NSK-2026-8819',
    pilgrimName: 'Ashok Varma',
    pilgrimPhone: '+91 98221 44556',
    emergencyContactName: 'Rajesh Varma (Brother)',
    emergencyContactPhone: '+91 98110 99882',
    bloodGroup: 'B+',
    homeCity: 'Indore, MP',
    registeredBooking: MOCK_BOOKINGS[0],
    qrPayload: JSON.stringify({
      passId: 'KP-NSK-2026-8819',
      pilgrim: 'Ashok Varma',
      stayName: 'Godavari Homestay & Wada Rooms',
      stayArea: 'Panchavati, Nashik',
      bookingCode: 'KMB-STAY-9402',
      emergencyContact: '+91 98110 99882',
    }),
    issuedDate: '28 Sep 2026',
  });

  // When bookings update, sync confirmed stay to Kumbh Pass
  useEffect(() => {
    const activeConfirmed = bookings.find((b) => b.status === 'confirmed');
    if (activeConfirmed) {
      setKumbhPass((prev) => ({
        ...prev,
        registeredBooking: activeConfirmed,
        qrPayload: JSON.stringify({
          passId: prev.passId,
          pilgrim: prev.pilgrimName,
          stayName: activeConfirmed.providerName,
          stayArea: activeConfirmed.areaName,
          stayAddress: activeConfirmed.providerAddress,
          bookingCode: activeConfirmed.bookingCode,
          hostPhone: activeConfirmed.providerPhone,
          emergencyContact: prev.emergencyContactPhone,
        }),
      }));
    }
  }, [bookings]);

  const t = (key: keyof typeof translations['en']): string => {
    const currentDict = translations[language] || translations['en'];
    return (currentDict as any)[key] || translations['en'][key] || key;
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const submitOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `KMB-FOOD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const submitBooking = (bookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingCode: `KMB-STAY-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((bk) => (bk.id === bookingId ? { ...bk, status } : bk))
    );
  };

  const submitReport = (reportData: Omit<ReportItem, 'id' | 'reportedAt' | 'status'>) => {
    const newReport: ReportItem = {
      ...reportData,
      id: `rep-${Date.now()}`,
      reportedAt: 'Just now',
      status: 'pending_review',
    };
    setReports((prev) => [newReport, ...prev]);
    
    // increment reported count on listing
    setListings((prev) =>
      prev.map((l) =>
        l.id === reportData.listingId
          ? { ...l, reportedCount: (l.reportedCount || 0) + 1 }
          : l
      )
    );
  };

  const approveProvider = (providerId: string) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === providerId
          ? {
              ...l,
              verificationLevel: 'provider_verified',
              verificationBadgeText: 'Provider Verified',
              status: 'active',
            }
          : l
      )
    );
  };

  const rejectProvider = (providerId: string) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === providerId
          ? {
              ...l,
              verificationLevel: 'pending',
              verificationBadgeText: 'Verification Rejected',
              status: 'suspended',
            }
          : l
      )
    );
  };

  const suspendListing = (listingId: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, status: 'suspended' } : l))
    );
    setReports((prev) =>
      prev.map((r) =>
        r.listingId === listingId ? { ...r, status: 'listing_suspended' } : r
      )
    );
  };

  const toggleListingActive = (listingId: string) => {
    setListings((prev) =>
      prev.map((l) => {
        if (l.id === listingId) {
          const nextStatus = l.status === 'active' ? 'paused' : 'active';
          return { ...l, status: nextStatus, availableNow: nextStatus === 'active' };
        }
        return l;
      })
    );
  };

  const addProviderListing = (
    listingData: Omit<ProviderListing, 'id' | 'registrationDate' | 'reportedCount'>
  ) => {
    const newListing: ProviderListing = {
      ...listingData,
      id: `${listingData.type}-${Date.now()}`,
      registrationDate: 'Today',
      reportedCount: 0,
    };
    setListings((prev) => [newListing, ...prev]);
  };

  const toggleFavorite = (listingId: string) => {
    setSavedFavorites((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        language,
        setLanguage,
        lowBandwidth,
        setLowBandwidth,
        t,
        activeNavTab,
        setActiveNavTab,
        listings,
        orders,
        bookings,
        reports,
        kumbhPass,
        filters,
        setFilters,
        resetFilters,
        selectedListing,
        setSelectedListing,
        orderModalListing,
        setOrderModalListing,
        bookingModalListing,
        setBookingModalListing,
        reportModalListing,
        setReportModalListing,
        safetyModalOpen,
        setSafetyModalOpen,
        kumbhPassModalOpen,
        setKumbhPassModalOpen,
        lostStayFinderOpen,
        setLostStayFinderOpen,
        submitOrder,
        updateOrderStatus,
        submitBooking,
        updateBookingStatus,
        submitReport,
        approveProvider,
        rejectProvider,
        suspendListing,
        toggleListingActive,
        addProviderListing,
        savedFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
