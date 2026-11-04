import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import {
  ArrowLeft,
  Check,
  MapPin,
  QrCode,
  Clock,
  Navigation,
  CheckCircle2,
  Package,
  CreditCard,
  Gift,
  Truck,
  Store,
  Download,
  Smartphone,
  ChevronRight,
  Info
} from 'lucide-react';

const RETURNABLE_ITEMS = [
  {
    id: 'wool_coat',
    name: 'RELAXED FIT HIGH NECK COAT',
    size: 'Size M',
    color: 'Taupe grey',
    price: '$129.00',
    priceNum: 129,
    image: './products/real_wool_coat.jpg',
    orderId: '#ZR-US-884920',
    deliveryDate: 'Delivered 6 days ago',
    ref: 'Ref. 8281/300/807'
  },
  {
    id: 'leather_jacket',
    name: 'LEATHER EFFECT JACKET',
    size: 'Size M',
    color: 'Black',
    price: '$119.00',
    priceNum: 119,
    image: './products/real_leather_jacket.jpg',
    orderId: '#ZR-US-884920',
    deliveryDate: 'Delivered 6 days ago',
    ref: 'Ref. 3427/410/800'
  },
  {
    id: 'blazer',
    name: 'OVERSIZED DOUBLE-BREASTED BLAZER',
    size: 'Size L',
    color: 'Charcoal grey',
    price: '$99.00',
    priceNum: 99,
    image: './products/man_blazer.jpg',
    orderId: '#ZR-US-879102',
    deliveryDate: 'Delivered 11 days ago',
    ref: 'Ref. 2199/102/802'
  }
];

const RETURN_REASONS = [
  { id: 'size_large', label: 'Size too large / Loose fit', sub: 'Garment is bigger than expected standard sizing' },
  { id: 'size_small', label: 'Size too small / Tight fit', sub: 'Garment is tighter around shoulders or waist' },
  { id: 'style_diff', label: 'Color or style differs from website', sub: 'Appearance does not match online photos' },
  { id: 'changed_mind', label: 'Changed mind / No longer needed', sub: 'Item is unworn with original tags attached' },
  { id: 'defective', label: 'Fabric or manufacturing defect', sub: 'Stitching, zipper, or material flaw found upon opening' }
];

const HCMC_LOCATIONS = [
  {
    id: 'vincom_dong_khoi',
    name: 'ZARA VINCOM DONG KHOI',
    district: 'District 1',
    address: '72 Le Thanh Ton, Dist. 1, Ho Chi Minh City',
    distance: '1.2 KM AWAY',
    badge: '✓ Instant QR Drop-off Counter Available',
    hours: '09:30 - 22:00 Daily · Floors 1 & 2',
    phone: '+84 28 3823 8888',
    type: 'store'
  },
  {
    id: 'crescent_mall',
    name: 'ZARA CRESCENT MALL',
    district: 'District 7',
    address: '101 Ton Dat Tien, Tan Phu, Dist. 7, Ho Chi Minh City',
    distance: '5.8 KM AWAY',
    badge: '✓ Self-Service Return Kiosk Available',
    hours: '10:00 - 22:00 Daily · Ground Floor',
    phone: '+84 28 5413 7777',
    type: 'store'
  },
  {
    id: 'landmark_81',
    name: 'ZARA LANDMARK 81',
    district: 'Binh Thanh Dist.',
    address: '720A Dien Bien Phu, Ward 22, Binh Thanh, Ho Chi Minh City',
    distance: '4.1 KM AWAY',
    badge: '✓ Dedicated Returns & Exchanges Desk',
    hours: '09:30 - 22:00 Daily · Floor L1',
    phone: '+84 28 3636 9999',
    type: 'store'
  },
  {
    id: 'saigon_centre',
    name: 'ZARA SAIGON CENTRE',
    district: 'District 1',
    address: '65 Le Loi, Ben Nghe, Dist. 1, Ho Chi Minh City',
    distance: '1.6 KM AWAY',
    badge: '✓ Express Service Partner Point',
    hours: '09:30 - 21:30 Daily · Level 2',
    phone: '+84 28 3821 5555',
    type: 'store'
  },
  {
    id: 'home_pickup',
    name: 'DOORSTEP COURIER PICKUP (DHL EXPRESS)',
    district: 'All HCMC Districts',
    address: 'Pickup from: 124 Nguyen Hue, Dist. 1, Ho Chi Minh City',
    distance: 'HOME PICKUP',
    badge: '✓ Courier arrives tomorrow (09:00 - 17:00) · Free for Members',
    hours: 'Next business day doorstep collection',
    phone: '1900 636 888',
    type: 'courier'
  }
];

export const EnhancedReturns = () => {
  const { handleRightAction } = useFlow();

  // Full 4-Step Returns Wizard State (Defaulting to Step 3 matches user's reference mockup)
  const [currentStep, setCurrentStep] = useState(3); // 1: Items, 2: Reason, 3: Drop-off, 4: QR Code
  const [selectedItemIds, setSelectedItemIds] = useState(['wool_coat']);
  const [selectedReasonId, setSelectedReasonId] = useState('size_large');
  const [otherReasonNote, setOtherReasonNote] = useState('');
  const [refundMethod, setRefundMethod] = useState('card'); // 'card' | 'voucher'
  const [selectedLocationId, setSelectedLocationId] = useState('vincom_dong_khoi');
  const [locationTab, setLocationTab] = useState('all'); // 'all' | 'store' | 'courier'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleItemSelection = (id) => {
    setSelectedItemIds(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) {
          showToast('At least 1 item must be selected for return');
          return prev;
        }
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Calculations
  const selectedItems = RETURNABLE_ITEMS.filter(item => selectedItemIds.includes(item.id));
  const totalRefund = selectedItems.reduce((acc, curr) => acc + curr.priceNum, 0);
  const selectedLocation = HCMC_LOCATIONS.find(loc => loc.id === selectedLocationId) || HCMC_LOCATIONS[0];
  const selectedReason = RETURN_REASONS.find(r => r.id === selectedReasonId) || RETURN_REASONS[0];

  const filteredLocations = HCMC_LOCATIONS.filter(loc => {
    if (locationTab === 'all') return true;
    return loc.type === locationTab;
  });

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative font-sans text-xs">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold shadow-xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Top Header with 30-Day Countdown Badge */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-800">
        <button
          onClick={() => handleRightAction('back')}
          className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[11px] font-bold uppercase tracking-wider font-mono">RETURNS WIZARD</span>
        </button>

        <span className="flex items-center gap-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
          <Clock className="w-3 h-3" /> 24 DAYS LEFT
        </span>
      </div>

      {/* Main Returns Wizard Body */}
      <div className="relative flex-1 px-4 py-3 overflow-y-auto device-scroll space-y-3">
        {/* 4-Step Stepper (Problem #26 Redesign - Matches Image 1 Exactly) */}
        <div className="relative bg-neutral-900/90 border border-neutral-800 p-2.5 rounded-xl">
          <AnnotationBadge
            id="returns_stepper"
            number="1"
            className="-top-2 right-4"
            variant="emerald"
          />

          <div className="flex items-center justify-between text-[10px] font-mono select-none">
            {/* Step 1: Items */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-1 transition-all ${
                currentStep > 1
                  ? 'text-emerald-400 hover:text-emerald-300'
                  : currentStep === 1
                  ? 'bg-white text-black px-1.5 py-0.5 rounded font-bold shadow-sm'
                  : 'text-neutral-500'
              }`}
            >
              {currentStep > 1 && <Check className="w-3 h-3 text-emerald-400" />}
              <span>1. Items</span>
            </button>

            <span className="text-neutral-600">›</span>

            {/* Step 2: Reason */}
            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-1 transition-all ${
                currentStep > 2
                  ? 'text-emerald-400 hover:text-emerald-300'
                  : currentStep === 2
                  ? 'bg-white text-black px-1.5 py-0.5 rounded font-bold shadow-sm'
                  : 'text-neutral-500'
              }`}
            >
              {currentStep > 2 && <Check className="w-3 h-3 text-emerald-400" />}
              <span>2. Reason</span>
            </button>

            <span className="text-neutral-600">›</span>

            {/* Step 3: Drop-off */}
            <button
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-1 transition-all ${
                currentStep > 3
                  ? 'text-emerald-400 hover:text-emerald-300'
                  : currentStep === 3
                  ? 'bg-white text-black px-1.5 py-0.5 rounded font-bold shadow-sm'
                  : 'text-neutral-500'
              }`}
            >
              {currentStep > 3 && <Check className="w-3 h-3 text-emerald-400" />}
              <span>3. Drop-off</span>
            </button>

            <span className="text-neutral-600">›</span>

            {/* Step 4: QR Code */}
            <button
              onClick={() => setCurrentStep(4)}
              className={`flex items-center gap-1 transition-all ${
                currentStep === 4
                  ? 'bg-white text-black px-1.5 py-0.5 rounded font-bold shadow-sm'
                  : 'text-neutral-500'
              }`}
            >
              <span>4. QR Code</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STEP 1: ITEMS SELECTION                                   */}
        {/* ========================================================= */}
        {currentStep === 1 && (
          <div className="space-y-3 animate-screen-fade">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                  STEP 1 · SELECT ITEMS TO RETURN
                </span>
                <span className="text-[10px] text-neutral-400">Order #ZR-VN-884920 · Delivered Oct 25</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded">
                30-Day Window
              </span>
            </div>

            <div className="space-y-2">
              {RETURNABLE_ITEMS.map((item) => {
                const isChecked = selectedItemIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItemSelection(item.id)}
                    className={`border rounded-xl p-2.5 flex items-center gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? 'border-emerald-500/80 bg-[#141b17]'
                        : 'border-neutral-800 bg-[#121214] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                        isChecked ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-neutral-600 bg-neutral-900'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 font-bold" />}
                    </div>

                    <div className="w-12 h-14 bg-neutral-900 rounded overflow-hidden shrink-0 border border-neutral-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex-1 overflow-hidden pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase text-white truncate">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 font-sans mt-0.5">
                        {item.size} · {item.color}
                      </p>
                      <p className="text-[9px] text-neutral-500 font-mono">{item.ref}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono text-white font-bold block">
                        {item.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Refund Estimate Summary */}
            <div className="bg-[#121214] border border-neutral-800 rounded-xl p-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                  Selected Items: <strong>{selectedItems.length}</strong>
                </span>
                <span className="text-[9px] text-neutral-500">Free in-store drop-off included</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-400 block">ESTIMATED REFUND</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  ${totalRefund.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: REASON & REFUND METHOD                            */}
        {/* ========================================================= */}
        {currentStep === 2 && (
          <div className="space-y-3 animate-screen-fade">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                STEP 2 · REASON & REFUND METHOD
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {selectedItems.length} item(s) selected
              </span>
            </div>

            {/* Select Reason */}
            <div className="bg-[#121214] border border-neutral-800 rounded-xl p-3 space-y-2">
              <span className="text-[10px] font-mono text-neutral-300 font-bold uppercase block">
                Why are you returning this item?
              </span>
              <div className="space-y-1.5">
                {RETURN_REASONS.map((r) => {
                  const isSelected = selectedReasonId === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReasonId(r.id)}
                      className={`p-2 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-emerald-500/80 bg-emerald-950/20 text-white'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-400 bg-emerald-400' : 'border-neutral-500'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold">{r.label}</p>
                        <p className="text-[9px] text-neutral-400 leading-tight">{r.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional note */}
              <input
                type="text"
                value={otherReasonNote}
                onChange={(e) => setOtherReasonNote(e.target.value)}
                placeholder="Additional notes for quality team (optional)..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-[10px] text-white placeholder:text-neutral-600 outline-none focus:border-neutral-600 font-sans mt-1"
              />
            </div>

            {/* Refund Destination Selection */}
            <div className="bg-[#121214] border border-neutral-800 rounded-xl p-3 space-y-2">
              <span className="text-[10px] font-mono text-neutral-300 font-bold uppercase block">
                Refund Method
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => setRefundMethod('card')}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                    refundMethod === 'card'
                      ? 'border-emerald-500 bg-emerald-950/20 text-white'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-400">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">Credit Card</span>
                  </div>
                  <p className="text-[9px] text-neutral-300">Visa ending in ****4092</p>
                  <span className="text-[8px] text-neutral-500 font-mono">3 - 5 business days</span>
                </div>

                <div
                  onClick={() => setRefundMethod('voucher')}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                    refundMethod === 'voucher'
                      ? 'border-amber-500 bg-amber-950/20 text-white'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-amber-400">
                    <Gift className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">Store Voucher</span>
                  </div>
                  <p className="text-[9px] text-neutral-300 font-bold">+10% Bonus Credit</p>
                  <span className="text-[8px] text-amber-300 font-mono">Instant balance credit</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: DROP-OFF LOCATION (HCMC LOCATIONS - USER IMAGE 2) */}
        {/* ========================================================= */}
        {currentStep === 3 && (
          <div className="space-y-3 animate-screen-fade">
            {/* Header info matching user's Image 2 */}
            <div className="relative bg-[#121214] border border-neutral-800 rounded-xl p-3.5 space-y-2.5">
              <AnnotationBadge
                id="returns_stepper"
                number="2"
                className="-top-2 right-4"
                variant="emerald"
              />

              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                  STEP 3 · SELECT DROP-OFF LOCATION
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <Navigation className="w-2.5 h-2.5" /> {selectedLocation.distance}
                </span>
              </div>

              {/* Selected Location Card Display (Exact structure as Image 2) */}
              <div className="border border-emerald-500/80 bg-emerald-950/20 rounded-lg p-3 space-y-1 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <h4 className="text-xs font-bold uppercase text-white tracking-wide">
                      {selectedLocation.name}
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
                <p className="text-[10px] text-neutral-300 pl-6 font-sans">
                  {selectedLocation.address}
                </p>
                <div className="pl-6 pt-1">
                  <span className="text-[9px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-mono">
                    {selectedLocation.badge}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-neutral-400 font-sans flex items-center justify-between pt-1">
                <span>Next: Instant Return QR Code</span>
                <span className="text-neutral-300 font-mono font-bold">[QR]</span>
              </div>
            </div>

            {/* Filter Tabs for HCMC Locations */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                Available Locations in Ho Chi Minh City ({HCMC_LOCATIONS.length})
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setLocationTab('all')}
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                    locationTab === 'all' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setLocationTab('store')}
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                    locationTab === 'store' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Stores (4)
                </button>
                <button
                  onClick={() => setLocationTab('courier')}
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                    locationTab === 'courier' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Courier
                </button>
              </div>
            </div>

            {/* Multiple Real ZARA Stores in Ho Chi Minh City */}
            <div className="space-y-2 max-h-56 overflow-y-auto device-scroll pr-0.5">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocationId === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocationId(loc.id);
                      showToast(`Selected: ${loc.name}`);
                    }}
                    className={`border rounded-xl p-2.5 cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'border-emerald-500 bg-[#141b17] shadow-md ring-1 ring-emerald-500/50'
                        : 'border-neutral-800 bg-[#121214] hover:border-neutral-700 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`p-1.5 rounded-full mt-0.5 shrink-0 ${
                        loc.type === 'courier' ? 'bg-blue-950 text-blue-400' : 'bg-neutral-800 text-rose-400'
                      }`}>
                        {loc.type === 'courier' ? <Truck className="w-3.5 h-3.5" /> : <Store className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-[11px] font-bold text-white uppercase leading-tight">
                            {loc.name}
                          </h5>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-[9.5px] text-neutral-300 mt-0.5 leading-snug">
                          {loc.address}
                        </p>
                        <p className="text-[8.5px] text-neutral-500 font-mono mt-0.5">
                          {loc.hours} · {loc.district}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[9px] font-mono font-bold text-emerald-400 block">
                        {loc.distance}
                      </span>
                      <span className="text-[8px] text-neutral-500 block">
                        Tap to choose
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: DIGITAL RETURN QR CODE READY                      */}
        {/* ========================================================= */}
        {currentStep === 4 && (
          <div className="space-y-3 animate-screen-fade">
            {/* Step 4: Digital Return QR Code (No Printer Needed) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>RETURN QR CODE READY</span>
              </div>

              {/* QR Code graphic */}
              <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg relative group">
                <QrCode className="w-32 h-32 text-black" />
                <div className="absolute inset-0 bg-black/5 rounded-xl pointer-events-none" />
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-mono font-bold text-white">
                  REF #ZR-RET-2026-9904
                </p>
                <p className="text-[9px] text-emerald-400 font-mono">
                  ✓ Valid until Nov 07, 2026 (7 days remaining)
                </p>
              </div>

              <div className="border-t border-neutral-800 pt-2 text-[10px] text-neutral-300 font-sans space-y-1">
                <div className="flex justify-between items-center text-neutral-400 font-mono text-[9px]">
                  <span>DROP-OFF LOCATION:</span>
                  <span className="text-white font-bold">{selectedLocation.name}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400 font-mono text-[9px]">
                  <span>REFUND ESTIMATE:</span>
                  <span className="text-emerald-400 font-bold">${totalRefund.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400 font-mono text-[9px]">
                  <span>REFUND METHOD:</span>
                  <span className="text-white font-bold">
                    {refundMethod === 'card' ? 'Visa ****4092' : 'Zara Store Credit (+10%)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick guidance alert */}
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 flex items-start gap-2 text-[10px] text-neutral-300">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                Present this screen at <strong className="text-white">{selectedLocation.name}</strong>. No printer, physical receipt, or paperwork needed!
              </p>
            </div>
          </div>
        )}

        {/* Selected Return Item Card (Persistent Preview) */}
        {currentStep !== 1 && (
          <div className="bg-[#121214] border border-neutral-800 rounded-xl p-2.5 flex items-center gap-3">
            <div className="w-10 h-12 bg-neutral-900 rounded overflow-hidden shrink-0 border border-neutral-700">
              <img
                src={selectedItems[0]?.image || './products/real_wool_coat.jpg'}
                alt={selectedItems[0]?.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase text-white truncate">
                  {selectedItems[0]?.name}
                </span>
                <span className="text-[8px] bg-emerald-950 text-emerald-400 px-1 rounded font-mono shrink-0">
                  {selectedItems.length} ITEM{selectedItems.length > 1 ? 'S' : ''}
                </span>
              </div>
              <p className="text-[9px] text-neutral-400 font-sans truncate mt-0.5">
                Reason: {selectedReason.label}
              </p>
            </div>
            <span className="text-[10px] text-neutral-300 font-mono font-bold shrink-0">
              ${totalRefund.toFixed(2)}
            </span>
          </div>
        )}

        {/* Generous 48dp Account Rows Sample (Audited comparison) */}
        <div className="border-t border-neutral-800 pt-2">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1 flex justify-between">
            <span>Normalized 48dp Touch Boundaries</span>
            <span className="text-emerald-400 font-mono">WCAG 2.2 AA</span>
          </div>
          <div className="space-y-1">
            <div
              onClick={() => handleRightAction('navigate', 'bag')}
              className="h-10 px-3 bg-neutral-900 rounded-lg flex items-center justify-between text-xs hover:bg-neutral-800 cursor-pointer"
            >
              <span>| 01 | PURCHASES</span>
              <span className="text-neutral-500 font-mono">›</span>
            </div>
            <div className="h-10 px-3 bg-neutral-800 text-white rounded-lg flex items-center justify-between text-xs font-bold border border-neutral-700">
              <span className="flex items-center gap-2">
                <span>| 02 | RETURNS</span>
                <span className="text-[9px] bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded font-mono">1 ACTIVE</span>
              </span>
              <span className="text-white font-mono">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Normalized 48px Action Buttons (Problem #28) */}
      <div className="relative border-t border-neutral-800 bg-black p-3 space-y-2">
        <AnnotationBadge
          id="returns_stepper"
          number="3"
          className="-top-3 right-8"
          variant="emerald"
        />

        {/* Step-specific Primary and Secondary CTAs */}
        {currentStep === 1 && (
          <>
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CONTINUE TO REASON (STEP 2) →</span>
            </button>
            <button
              onClick={() => handleRightAction('navigate', 'account')}
              className="w-full h-11 border border-neutral-700 text-neutral-300 font-bold uppercase tracking-widest text-xs rounded hover:border-white hover:text-white transition-colors cursor-pointer"
            >
              ‹ CANCEL & RETURN TO ACCOUNT
            </button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CONTINUE TO DROP-OFF (STEP 3) →</span>
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full h-11 border border-neutral-700 text-neutral-300 font-bold uppercase tracking-widest text-xs rounded hover:border-white hover:text-white transition-colors cursor-pointer"
            >
              ‹ BACK TO ITEMS (STEP 1)
            </button>
          </>
        )}

        {currentStep === 3 && (
          <>
            <button
              onClick={() => setCurrentStep(4)}
              className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>GENERATE RETURN QR CODE (STEP 4) →</span>
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full h-11 border border-neutral-700 text-neutral-300 font-bold uppercase tracking-widest text-xs rounded hover:border-white hover:text-white transition-colors cursor-pointer"
            >
              ‹ BACK TO REASON (STEP 2)
            </button>
          </>
        )}

        {currentStep === 4 && (
          <>
            <button
              onClick={() => showToast('Saved to Apple / Google Wallet!')}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-widest text-xs rounded transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>SAVE TO APPLE / GOOGLE WALLET</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full h-11 border border-neutral-700 text-neutral-300 font-bold uppercase tracking-widest text-xs rounded hover:border-white hover:text-white transition-colors cursor-pointer"
            >
              ‹ CHANGE DROP-OFF LOCATION
            </button>
          </>
        )}
      </div>
    </div>
  );
};

