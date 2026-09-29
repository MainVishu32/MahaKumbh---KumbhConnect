import React, { useState } from 'react';
import { ProviderListing, ReportItem } from '../types';
import { useApp } from '../context/AppContext';
import { X, Flag, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';

interface ReportModalProps {
  listing: ProviderListing;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ listing, onClose }) => {
  const { submitReport } = useApp();

  const [reason, setReason] = useState<ReportItem['reason']>('Incorrect price');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      listingId: listing.id,
      listingTitle: listing.title,
      providerName: listing.providerName,
      reportedBy: 'Pilgrim User (+91 98221-XXXX)',
      reason,
      details: details.trim() || `Reported for ${reason}.`,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">Report Suspicious Listing</h3>
              <p className="text-[11px] text-stone-500">{listing.providerName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-stone-900">
              Thank you. Our team will review this listing.
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your report helps protect other pilgrims and maintain fair pricing during Nashik Kumbh Mela. An administrator will inspect this provider within 2 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-2 w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              KumbhConnect enforces fair pricing and verified safety. If you were overcharged or encountered false information, let us know.
            </div>

            <div>
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-1">
                Reason for Reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="Incorrect price">Incorrect price / Overcharging</option>
                <option value="Fake listing">Fake listing / Host not at address</option>
                <option value="Suspicious behavior">Suspicious behavior</option>
                <option value="Unsafe accommodation">Unsafe accommodation / Poor hygiene</option>
                <option value="Misleading photos">Misleading photos / Inaccurate room</option>
                <option value="Payment fraud">Payment fraud / Demanding advance</option>
                <option value="Other">Other reason</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-1">
                Describe the Issue (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Provide details such as quoted rate, host behavior, or discrepancies..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
