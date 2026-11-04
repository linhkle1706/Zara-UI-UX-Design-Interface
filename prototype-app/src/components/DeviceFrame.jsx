import React, { useState, useEffect } from 'react';
import { useFlow, FLOWS } from '../context/FlowContext';
import { Wifi, Battery, Signal, ChevronLeft, Circle, Menu as AndroidMenu, X, ArrowRight } from 'lucide-react';

export const DeviceFrame = ({
  variant = 'original', // 'original' | 'enhanced'
  title = '',
  subtitle = '',
  deviceType = 'iphone', // 'iphone' | 'android'
  children
}) => {
  const {
    leftFlow,
    rightFlow,
    handleLeftAction,
    handleRightAction,
    liveActivity,
  } = useFlow();

  const isOriginal = variant === 'original';
  const handleAction = isOriginal ? handleLeftAction : handleRightAction;
  const currentScreenFlow = isOriginal ? leftFlow : rightFlow;
  const isLightScreen = ['pdp', 'bag', 'checkout', 'payment_result', 'lookbook'].includes(currentScreenFlow);

  const [isRecentsOpen, setIsRecentsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const scrollContainerRef = React.useRef(null);

  // Real-time Vietnam Time (Asia/Ho_Chi_Minh · UTC+7)
  const getVietnamTime = () => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
    } catch {
      return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  };

  const [vietnamTime, setVietnamTime] = useState(getVietnamTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setVietnamTime(getVietnamTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-close Recents overlay & smoothly reset scroll position on navigation
  useEffect(() => {
    setIsRecentsOpen(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentScreenFlow]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleRecentsClick = (e) => {
    e.stopPropagation();
    setIsRecentsOpen(prev => !prev);
  };

  const handleHomeClick = (e) => {
    e.stopPropagation();
    setIsRecentsOpen(false);
    handleAction('home');
  };

  const handleBackClick = (e) => {
    e.stopPropagation();
    if (isRecentsOpen) {
      setIsRecentsOpen(false);
      return;
    }
    const result = handleAction('back');
    if (result && result.isAtRoot) {
      showToast('Already on Home screen');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Device Header Tag */}
      <div className="mb-3 flex items-center justify-between w-full max-w-[390px] px-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
              isOriginal
                ? 'bg-red-950/80 text-red-300 border-red-800/80 shadow-red-950/50'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80 shadow-emerald-950/50'
            } shadow-md`}
          >
            {isOriginal ? '● BEFORE · ORIGINAL' : '✦ AFTER · ENHANCED'}
          </span>
          <span className="text-xs text-neutral-400 font-medium">
            {deviceType === 'iphone' ? 'iPhone 16 Pro' : 'Galaxy S24 Ultra'}
          </span>
        </div>
        <span className="text-[11px] text-neutral-500 font-mono">
          {isOriginal ? 'Baseline' : 'Report 2 Fix'}
        </span>
      </div>

      {/* Outer Phone Shell */}
      <div
        className={`relative bg-[#1a1a1c] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-300 ${
          deviceType === 'iphone'
            ? 'rounded-[52px] ring-1 ring-white/15 border-[3px] border-[#38383a]'
            : 'rounded-[38px] ring-1 ring-white/10 border-[3px] border-[#2c2d30]'
        }`}
        style={{
          width: '390px',
          height: '810px',
        }}
      >
        {/* Antenna bands for realism */}
        {deviceType === 'iphone' && (
          <>
            <div className="absolute -left-[5px] top-28 w-[3px] h-3 bg-neutral-600 rounded-sm" />
            <div className="absolute -left-[5px] top-40 w-[3px] h-10 bg-neutral-600 rounded-sm" />
            <div className="absolute -left-[5px] top-56 w-[3px] h-10 bg-neutral-600 rounded-sm" />
            <div className="absolute -right-[5px] top-36 w-[3px] h-14 bg-neutral-600 rounded-sm" />
          </>
        )}

        {/* Screen Bezel & Screen Wrapper */}
        <div
          className={`relative w-full h-full overflow-hidden flex flex-col select-none transition-colors duration-300 ${
            isLightScreen ? 'bg-white' : 'bg-black'
          } ${
            deviceType === 'iphone' ? 'rounded-[44px]' : 'rounded-[30px]'
          }`}
        >
          {/* Status Bar: On Home screen, absolute transparent overlay for true edge-to-edge layout under Dynamic Island */}
          <div
            className={`w-full px-6 flex items-center justify-between z-40 pt-1.5 transition-colors duration-300 ${
              currentScreenFlow === 'home'
                ? 'absolute top-0 left-0 right-0 h-11 bg-transparent text-white drop-shadow pointer-events-none'
                : isLightScreen
                ? 'shrink-0 h-11 bg-white/95 backdrop-blur-md text-neutral-900 border-b border-neutral-100/60'
                : 'shrink-0 h-11 bg-black/90 backdrop-blur-md text-white'
            }`}
          >
            {/* Real-time Vietnam Clock (Apple HIG SF Pro: 14px Semibold Tabular) */}
            <span className="text-[14px] font-semibold tracking-[-0.2px] tabular-nums select-none leading-none pl-1">
              {vietnamTime}
            </span>

            {/* iPhone Dynamic Island with Apple Live Activities */}
            {deviceType === 'iphone' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-2 z-50 pointer-events-auto flex items-center justify-center">
                <div
                  onClick={() => {
                    if (variant === 'enhanced' && liveActivity) {
                      handleRightAction('navigate', 'bag');
                    }
                  }}
                  className={`h-[30px] rounded-full flex items-center justify-between px-2.5 shadow-md origin-center transition-all duration-300 ease-out select-none ${
                    variant === 'enhanced' && liveActivity
                      ? 'w-56 bg-black text-white ring-1 ring-emerald-500/60 shadow-lg animate-island-live cursor-pointer'
                      : isLightScreen
                      ? 'w-28 bg-black text-white ring-1 ring-black/10 shadow-sm'
                      : 'w-28 bg-black text-white ring-1 ring-white/10 shadow-md'
                  }`}
                >
                  {variant === 'enhanced' && liveActivity ? (
                    <>
                      <div className="flex items-center gap-1.5 overflow-hidden pr-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <span className="text-[11.5px] font-semibold text-white truncate tracking-tight font-sans">
                          {liveActivity.title}
                        </span>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-[#0a0f1d] ring-1 ring-neutral-700/60 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-950" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-2.5" />
                      <div className="w-3 h-3 rounded-full bg-[#0a0f1d] ring-1 ring-neutral-700/60 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-950" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Android Punch Hole Camera */}
            {deviceType === 'android' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-2 z-40 pointer-events-none flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-black rounded-full ring-1 ring-neutral-700 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#121c2e]" />
                </div>
              </div>
            )}

            {/* Status Icons */}
            <div className={`flex items-center gap-1.5 transition-colors duration-300 pr-1 ${isLightScreen ? 'text-neutral-900' : 'text-neutral-300'}`}>
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className={`w-4 h-4 ${isLightScreen ? 'fill-neutral-900' : 'fill-white'}`} />
            </div>
          </div>

          {/* Interactive Screen Body with Fluid Transition */}
          <div
            ref={scrollContainerRef}
            className={`relative flex-1 w-full overflow-y-auto overflow-x-hidden device-scroll flex flex-col ${
              isLightScreen ? 'bg-white text-black' : 'bg-black text-neutral-100'
            }`}
          >
            <div key={currentScreenFlow} className="w-full h-full flex flex-col flex-1 animate-screen-fade">
              {children}
            </div>

            {/* Android Recents / Multitasking Overview Overlay */}
            {deviceType === 'android' && isRecentsOpen && (
              <div className="absolute inset-0 z-50 bg-[#0c0d10]/95 backdrop-blur-md flex flex-col animate-in fade-in duration-150">
                {/* One UI Overview Header */}
                <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between bg-black/60 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white text-black font-black text-xs flex items-center justify-center font-serif">
                      Z
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white tracking-wide">ZARA GLOBAL</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 font-mono">
                          Recent Apps
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400">Select screen for rapid preview</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsRecentsOpen(false)}
                    className="w-7 h-7 rounded-full bg-neutral-800/80 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Screen Cards List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5 device-scroll">
                  {FLOWS.map((flow) => {
                    const isActive = currentScreenFlow === flow.id;
                    return (
                      <div
                        key={flow.id}
                        onClick={() => {
                          handleAction('navigate', flow.id);
                          setIsRecentsOpen(false);
                        }}
                        className={`group p-3 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-neutral-900 border-blue-500 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/50'
                            : 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? 'bg-blue-400 animate-pulse' : 'bg-neutral-600'
                              }`}
                            />
                            <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                              {flow.label}
                            </span>
                          </div>
                          {isActive ? (
                            <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                              ACTIVE
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono text-neutral-500">
                              {flow.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                          <span className="text-[10px] text-neutral-400 font-mono">Author: {flow.author}</span>
                          <span className="text-neutral-500 text-[10px] group-hover:text-neutral-200 flex items-center gap-0.5">
                            Tap to open <ArrowRight className="w-2.5 h-2.5 inline" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Quick-Action Bar */}
                <div className="p-3 border-t border-neutral-800 bg-black/60 shrink-0 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      handleAction('home');
                      setIsRecentsOpen(false);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-300 hover:text-white transition-all active:scale-95 border border-neutral-700 text-center cursor-pointer"
                  >
                    Return to Home Screen
                  </button>
                  <button
                    onClick={() => setIsRecentsOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-xs font-medium text-blue-300 hover:text-blue-200 transition-all active:scale-95 border border-blue-800/80 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Android System Toast */}
            {deviceType === 'android' && toastMessage && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/95 text-neutral-200 text-[11px] font-medium px-4 py-2 rounded-full border border-neutral-700/80 shadow-2xl z-50 flex items-center gap-2 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-150">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{toastMessage}</span>
              </div>
            )}
          </div>

          {/* Bottom Bar: iPhone Home Indicator OR Android 3-Button Nav */}
          {deviceType === 'iphone' ? (
            <div
              className={`w-full flex items-center justify-center z-30 cursor-pointer group transition-colors duration-300 ${
                currentScreenFlow === 'home'
                  ? 'absolute bottom-0 left-0 right-0 h-6 bg-transparent pointer-events-auto'
                  : isLightScreen
                  ? 'shrink-0 h-6 bg-white'
                  : 'shrink-0 h-6 bg-black/90 backdrop-blur-sm'
              }`}
              onClick={handleHomeClick}
              title="iPhone Home Bar - Tap to return Home"
              aria-label="Home"
            >
              <div
                className={`w-32 h-1 group-hover:scale-105 group-active:scale-95 transition-all rounded-full ${
                  currentScreenFlow === 'home'
                    ? 'bg-white/75 group-hover:bg-white drop-shadow'
                    : isLightScreen
                    ? 'bg-neutral-800/60 group-hover:bg-neutral-900'
                    : 'bg-white/70 group-hover:bg-white'
                }`}
              />
            </div>
          ) : (
            <div className="w-full shrink-0 h-9 flex items-center justify-around bg-black text-neutral-400 z-30 border-t border-neutral-900/50 px-6">
              {/* Recents Button (≡) */}
              <button
                type="button"
                onClick={handleRecentsClick}
                className={`w-14 h-7 flex items-center justify-center rounded-lg transition-all duration-150 active:scale-90 active:bg-white/25 cursor-pointer ${
                  isRecentsOpen
                    ? 'bg-white/20 text-white ring-1 ring-white/30'
                    : 'hover:bg-white/10 hover:text-white text-neutral-400'
                }`}
                title="Recent Apps (≡)"
                aria-label="Recent Apps"
              >
                <AndroidMenu className="w-4 h-4" />
              </button>

              {/* Home Button (○) */}
              <button
                type="button"
                onClick={handleHomeClick}
                className="w-14 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white active:bg-white/25 active:scale-90 transition-all duration-150 text-neutral-400 cursor-pointer"
                title="Home (○)"
                aria-label="Home"
              >
                <Circle className="w-3.5 h-3.5" />
              </button>

              {/* Back Button (<) */}
              <button
                type="button"
                onClick={handleBackClick}
                className="w-14 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white active:bg-white/25 active:scale-90 transition-all duration-150 text-neutral-400 cursor-pointer"
                title="Back (<)"
                aria-label="Back"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
