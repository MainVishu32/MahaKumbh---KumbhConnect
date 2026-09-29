import React, { useState } from 'react';
import { CROWD_ZONES } from '../data/mockData';
import { CrowdZone, CrowdLevel } from '../types';
import { Users, AlertTriangle, Compass, ChevronRight, CheckCircle2, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CrowdSmartWidgetProps {
  onSelectArea?: (areaName: string) => void;
}

export const CrowdSmartWidget: React.FC<CrowdSmartWidgetProps> = ({ onSelectArea }) => {
  const [selectedZone, setSelectedZone] = useState<CrowdZone>(CROWD_ZONES[0]);
  const { setFilters, setActiveNavTab } = useApp();

  const getBadgeStyle = (level: CrowdLevel) => {
    switch (level) {
      case 'high':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'moderate':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    }
  };

  const getDotColor = (level: CrowdLevel) => {
    switch (level) {
      case 'high':
        return 'bg-rose-500';
      case 'moderate':
        return 'bg-amber-500';
      case 'low':
        return 'bg-emerald-500';
    }
  };

  const handleFilterToZone = (zone: CrowdZone) => {
    let mappedArea = 'all';
    if (zone.name.includes('Panchavati')) mappedArea = 'Panchavati';
    else if (zone.name.includes('Ram Kund')) mappedArea = 'Ram Kund';
    else if (zone.name.includes('Tapovan')) mappedArea = 'Tapovan';
    else if (zone.name.includes('CBS')) mappedArea = 'CBS';
    else if (zone.name.includes('Gangapur')) mappedArea = 'Gangapur Road';
    else if (zone.name.includes('Nashik Road')) mappedArea = 'Nashik Road';

    setFilters((prev) => ({ ...prev, areaFilter: mappedArea }));
    if (onSelectArea) {
      onSelectArea(mappedArea);
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>CrowdSmart Nashik</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                Live Guidance
              </span>
            </h3>
            <p className="text-[11px] text-stone-500">Crowd-density awareness & stay dispersal recommendations</p>
          </div>
        </div>
      </div>

      {/* Horizontal Zone Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
        {CROWD_ZONES.map((zone) => {
          const isSelected = selectedZone.id === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`p-2 text-left rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-400'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-stone-800 truncate">
                  {zone.name.split(' ')[0]} {zone.name.split(' ')[1] || ''}
                </span>
                <span className={`w-2 h-2 rounded-full ${getDotColor(zone.crowdLevel)}`} />
              </div>
              <div className="text-[10px] text-stone-500 capitalize">
                {zone.crowdLevel} density
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Zone Deep Dive */}
      <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-900">{selectedZone.name}</span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeStyle(
                selectedZone.crowdLevel
              )}`}
            >
              {selectedZone.crowdLevel.toUpperCase()} CROWD
            </span>
          </div>
          <p className="text-xs text-stone-700 leading-normal">
            💡 <strong className="text-stone-900">Smart Advice:</strong> {selectedZone.smartAdvice}
          </p>
          <div className="text-[11px] text-stone-500">
            ⏳ Best time to visit: <span className="font-medium text-stone-700">{selectedZone.bestTimeToVisit}</span>
          </div>
        </div>

        <button
          onClick={() => handleFilterToZone(selectedZone)}
          className="shrink-0 px-3 py-1.5 bg-white border border-stone-300 hover:border-orange-400 text-stone-800 hover:text-orange-700 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Find providers here</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
