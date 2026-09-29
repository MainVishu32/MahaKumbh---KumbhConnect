import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ProviderListing, CrowdZone } from '../types';
import { CROWD_ZONES, NASHIK_CENTER } from '../data/mockData';
import { Shield, Sparkles, MapPin, Navigation, Eye, WifiOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LeafletMapProps {
  listings: ProviderListing[];
  onSelectListing: (listing: ProviderListing) => void;
  selectedListingId?: string;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  listings,
  onSelectListing,
  selectedListingId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const crowdLayerRef = useRef<L.LayerGroup | null>(null);

  const { lowBandwidth, t } = useApp();
  const [mapLoadedInLowBw, setMapLoadedInLowBw] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<ProviderListing | null>(null);

  const shouldRenderMap = !lowBandwidth || mapLoadedInLowBw;

  useEffect(() => {
    if (!shouldRenderMap || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [NASHIK_CENTER.lat, NASHIK_CENTER.lng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // Free OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | KumbhConnect Nashik',
        maxZoom: 18,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      crowdLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Don't necessarily destroy on every render, just when unmounting or changing mode
    };
  }, [shouldRenderMap]);

  // Update Crowd Circles
  useEffect(() => {
    if (!mapInstanceRef.current || !crowdLayerRef.current) return;

    crowdLayerRef.current.clearLayers();

    CROWD_ZONES.forEach((zone) => {
      const color =
        zone.crowdLevel === 'high'
          ? '#dc2626'
          : zone.crowdLevel === 'moderate'
          ? '#d97706'
          : '#16a34a';

      const circle = L.circle([zone.lat, zone.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.15,
        radius: zone.crowdLevel === 'high' ? 450 : 600,
        weight: 1.5,
        dashArray: '4, 4',
      });

      circle.bindTooltip(
        `<strong>${zone.name}</strong><br/>Crowd: ${zone.crowdLevel.toUpperCase()}<br/>${zone.smartAdvice}`,
        { permanent: false, direction: 'top' }
      );

      circle.addTo(crowdLayerRef.current!);
    });
  }, [shouldRenderMap]);

  // Update Markers when listings change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    listings.forEach((listing) => {
      const isFood = listing.type === 'food';
      const isSelected = listing.id === selectedListingId;

      // Custom HTML Marker Icon
      const iconHtml = `
        <div class="relative group cursor-pointer transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 ${
          isSelected ? 'scale-125 z-50' : 'z-10'
        }">
          <div class="px-2 py-1 rounded-md text-[11px] font-bold shadow-md flex items-center gap-1 border ${
            isFood
              ? 'bg-orange-600 text-white border-orange-700'
              : 'bg-stone-900 text-white border-stone-800'
          } ${isSelected ? 'ring-2 ring-orange-400 ring-offset-2' : ''}">
            <span>${isFood ? '🍱' : '🏠'}</span>
            <span>₹${listing.basePrice}</span>
            ${
              listing.verificationLevel === 'provider_verified'
                ? '<span class="text-emerald-300 text-[10px]">🛡️</span>'
                : ''
            }
          </div>
          <div class="w-2 h-2 mx-auto rotate-45 -mt-1 ${
            isFood ? 'bg-orange-600' : 'bg-stone-900'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: iconHtml,
        iconSize: [60, 30],
        iconAnchor: [30, 30],
      });

      const marker = L.marker([listing.location.lat, listing.location.lng], {
        icon: customIcon,
      });

      marker.on('click', () => {
        setSelectedPreview(listing);
        onSelectListing(listing);
      });

      marker.addTo(markersLayerRef.current!);
    });
  }, [listings, selectedListingId, shouldRenderMap]);

  // Center on selected listing if changed
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedListingId) return;
    const target = listings.find((l) => l.id === selectedListingId);
    if (target) {
      mapInstanceRef.current.flyTo([target.location.lat, target.location.lng], 15, {
        duration: 0.8,
      });
      setSelectedPreview(target);
    }
  }, [selectedListingId, listings]);

  if (!shouldRenderMap) {
    return (
      <div className="w-full h-full min-h-[380px] bg-stone-100 border border-stone-200 rounded-xl flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
          <WifiOff className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900">Map Paused in Low-Bandwidth Mode</h3>
        <p className="text-xs text-stone-500 max-w-sm mt-1">
          OpenStreetMap tiles are disabled to preserve your battery and data speed during high Kumbh congregation.
        </p>
        <button
          onClick={() => setMapLoadedInLowBw(true)}
          className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-colors"
        >
          Load Interactive Map Anyway
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-stone-200 shadow-sm">
      {/* Map Target */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px] z-10" />

      {/* Floating Map Legend */}
      <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm border border-stone-200 rounded-lg p-2 text-[11px] shadow-sm flex flex-col gap-1 pointer-events-auto">
        <div className="font-semibold text-stone-800 mb-0.5">Map Legend</div>
        <div className="flex items-center gap-1.5 text-stone-600">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block"></span>
          <span>Food (₹)</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-600">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block"></span>
          <span>Stay (₹)</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-600">
          <span className="text-emerald-600">🛡️</span>
          <span>Verified Host</span>
        </div>
        <div className="border-t border-stone-200 my-0.5 pt-1 text-[10px] text-stone-500">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
          <span>High Crowd Zone</span>
        </div>
      </div>

      {/* Floating Selected Provider Preview Card */}
      {selectedPreview && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-84 z-20 bg-white border border-stone-200 rounded-xl p-3 shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                <span>{selectedPreview.type === 'food' ? '🍱 Food' : '🏠 Stay'}</span>
                <span>·</span>
                <span>{selectedPreview.location.areaName}</span>
                <span>·</span>
                <span className="text-stone-700 font-semibold">{selectedPreview.location.distanceKm} km</span>
              </div>
              <h4 className="text-sm font-bold text-stone-900 mt-0.5 leading-snug line-clamp-1">
                {selectedPreview.providerName}
              </h4>
            </div>
            <button
              onClick={() => setSelectedPreview(null)}
              className="text-stone-400 hover:text-stone-700 text-xs p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
            <div>
              <div className="text-xs font-bold text-stone-900">
                ₹{selectedPreview.basePrice} <span className="text-[10px] font-normal text-stone-500">/ {selectedPreview.priceUnit}</span>
              </div>
              <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-600" />
                <span>{selectedPreview.verificationBadgeText}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectListing(selectedPreview)}
              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              {t('viewDetails')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
