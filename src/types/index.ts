export type UserRole = 'pilgrim' | 'provider' | 'admin';

export type Language = 'en' | 'mr' | 'hi';

export type ListingCategory = 'food_home' | 'food_tiffin' | 'stay_pg' | 'stay_room' | 'stay_homestay';

export type VerificationLevel = 'phone_verified' | 'identity_submitted' | 'provider_verified' | 'pending';

export type CrowdLevel = 'low' | 'moderate' | 'high';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  areaName: string;
  address: string;
  landmark?: string;
  distanceKm?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameMr?: string;
  nameHi?: string;
  price: number;
  typicalMarketMin: number;
  typicalMarketMax: number;
  isVegetarian: boolean;
  preparationTimeMins: number;
  description: string;
  image?: string;
  available: boolean;
}

export interface RoomDetail {
  id: string;
  roomType: 'Single Bed' | 'Shared PG Room' | 'Private Family Room' | 'Dormitory Bed' | 'Traditional Wada Homestay';
  totalBeds: number;
  maxGuests: number;
  hasAttachedBathroom: boolean;
  foodIncluded: boolean;
  checkInTime: string;
  checkOutTime: string;
  pricePerNight: number;
  typicalMarketMin: number;
  typicalMarketMax: number;
  availableRooms: number;
  amenities: string[];
}

export interface Review {
  id: string;
  authorName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedStayOrMeal: boolean;
}

export interface ProviderListing {
  id: string;
  providerName: string;
  hostName: string;
  hostPhone: string;
  category: ListingCategory;
  type: 'food' | 'stay';
  title: string;
  description: string;
  shortDescription: string;
  location: LocationCoordinates;
  priceDisplay: string;
  basePrice: number;
  priceUnit: string;
  typicalMinPrice: number;
  typicalMaxPrice: number;
  rating: number;
  reviewCount: number;
  verificationLevel: VerificationLevel;
  verificationBadgeText: string;
  isVegetarian?: boolean;
  hygieneNotes?: string;
  images: string[];
  menuItems?: MenuItem[];
  roomDetails?: RoomDetail;
  availableNow: boolean;
  serviceType?: 'pickup_and_delivery' | 'pickup_only' | 'dine_in';
  idDocumentType?: string;
  idDocumentNumberMasked?: string;
  registrationDate: string;
  status: 'active' | 'paused' | 'suspended' | 'pending_verification';
  reportedCount: number;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  serviceMethod: 'pickup' | 'delivery';
  deliveryAddress?: string;
  customerName: string;
  customerPhone: string;
  status: 'pending' | 'accepted' | 'preparing' | 'ready_for_pickup' | 'completed' | 'cancelled';
  paymentMethod: 'pay_at_pickup' | 'pay_on_delivery' | 'upi_simulated';
  createdAt: string;
  estimatedMinutes: number;
}

export interface Booking {
  id: string;
  bookingCode: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  providerAddress: string;
  areaName: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  roomsCount: number;
  roomType: string;
  totalNights: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  status: 'pending_provider_approval' | 'confirmed' | 'rejected' | 'checked_in' | 'completed' | 'cancelled';
  createdAt: string;
  lat: number;
  lng: number;
}

export interface KumbhPass {
  passId: string;
  pilgrimName: string;
  pilgrimPhone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: string;
  homeCity: string;
  registeredBooking?: Booking;
  qrPayload: string;
  issuedDate: string;
}

export interface ReportItem {
  id: string;
  listingId: string;
  listingTitle: string;
  providerName: string;
  reportedBy: string;
  reason: 'Fake listing' | 'Incorrect price' | 'Suspicious behavior' | 'Unsafe accommodation' | 'Misleading photos' | 'Payment fraud' | 'Other';
  details: string;
  status: 'pending_review' | 'investigated' | 'dismissed' | 'listing_suspended';
  reportedAt: string;
}

export interface CrowdZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  crowdLevel: CrowdLevel;
  densityDescription: string;
  smartAdvice: string;
  bestTimeToVisit: string;
}

export interface FilterState {
  searchQuery: string;
  typeFilter: 'all' | 'food' | 'stay';
  categoryFilter: string;
  maxDistanceKm: number;
  foodPreference: 'all' | 'veg' | 'nonveg';
  priceRangeFood: 'all' | 'under100' | '100_200' | '200plus';
  priceRangeStay: 'all' | 'under500' | '500_1000' | '1000plus';
  minRating: number;
  verifiedOnly: boolean;
  availableOnly: boolean;
  areaFilter: string;
}
