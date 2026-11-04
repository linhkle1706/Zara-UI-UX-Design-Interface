import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { Check, AlertTriangle, ShieldCheck, ArrowLeft } from 'lucide-react';

export const EnhancedLogin = () => {
  const { handleRightAction } = useFlow();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [emailInput, setEmailInput] = useState('d.trunghieu@gmail.com');
  const [step, setStep] = useState(1); // 1: Email, 2: Password & OTP
  const [passwordInput, setPasswordInput] = useState('secretPass@123');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };
  const strength = calculateStrength(passwordInput);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative font-sans text-xs">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold shadow-xl animate-bounce flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-[#1c1c1e] px-4 py-2 flex items-center justify-between text-neutral-400 text-[11px] border-b border-neutral-800">
        <button
          onClick={() => handleRightAction('back')}
          className="text-white hover:text-neutral-300"
          title="Back"
        >
          Cancel
        </button>
        <span className="font-mono text-neutral-300">account.zara.com</span>
        <span className="text-[10px] text-emerald-400 font-mono">TLS 1.3</span>
      </div>

      {/* Main Body */}
      <div className="relative flex-1 px-5 pt-4 overflow-y-auto device-scroll">
        <div className="text-center mb-4">
          <span className="zara-logo text-3xl font-black tracking-tighter text-white">
            ZARA
          </span>
        </div>

        {/* Distinct Pathways: Dedicated Tabs (Problem #22) */}
        <div className="relative border-b border-neutral-800 flex mb-5">
          <AnnotationBadge
            id="auth_tabs"
            number="1"
            className="-top-2 left-20"
            variant="emerald"
          />

          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'login'
                ? 'text-white border-b-2 border-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            LOG IN
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'register'
                ? 'text-white border-b-2 border-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            REGISTER
          </button>
        </div>

        {step === 1 ? (
          /* Step 1: Email with Live Checkmark (Problem #23) */
          <div className="space-y-4">
            <div className="relative">
              <AnnotationBadge
                id="auth_tabs"
                number="2"
                className="top-1 right-2"
                variant="emerald"
              />

              <label className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                EMAIL ADDRESS
              </label>

              <div className="relative flex items-center">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  placeholder="name@example.com"
                />
                <span className="absolute right-3 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3" /> VALID
                </span>
              </div>

              <p className="text-[10px] text-emerald-400/90 font-mono mt-1.5 flex items-center gap-1">
                <span>✓</span> RFC 5322 email syntax verified instantly
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors shadow-md mt-4"
            >
              CONTINUE TO {activeTab === 'login' ? 'SIGN IN' : 'REGISTER'}
            </button>

            {/* Social logins */}
            <div className="space-y-2 pt-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 text-center mb-2">
                OR ACCESS WITH
              </div>
              <button
                onClick={() => {
                  showToast('Authenticated via Apple ID (d.trunghieu@icloud.com)');
                  setTimeout(() => handleRightAction('navigate', 'home'), 1200);
                }}
                className="w-full py-2.5 border border-neutral-700 rounded text-neutral-200 text-xs font-semibold hover:border-white hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2"
              >
                <span> CONTINUE WITH APPLE</span>
              </button>
              <button
                onClick={() => {
                  showToast('Authenticated via Google (d.trunghieu@gmail.com)');
                  setTimeout(() => handleRightAction('navigate', 'home'), 1200);
                }}
                className="w-full py-2.5 border border-neutral-700 rounded text-neutral-200 text-xs font-semibold hover:border-white hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2"
              >
                <span>G CONTINUE WITH GOOGLE</span>
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Dynamic Password Meter & Inline OTP (Problem #24) */
          <div className="space-y-4">
            <button
              onClick={() => setStep(1)}
              className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change email ({emailInput})</span>
            </button>

            <div className="relative bg-neutral-900 border border-neutral-800 p-3.5 rounded-lg space-y-2">
              <AnnotationBadge
                id="auth_tabs"
                number="3"
                className="-top-2 right-2"
                variant="emerald"
              />

              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold uppercase">1 · {activeTab === 'login' ? 'ENTER PASSWORD' : 'CREATE PASSWORD'}</span>
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="text-[10px] text-neutral-400 hover:text-white cursor-pointer font-mono"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white focus:border-white focus:outline-none"
              />

              {/* 3-Tier Dynamic Strength Bar */}
              <div className="grid grid-cols-3 gap-1 pt-1">
                <div className={`h-1 rounded transition-colors ${strength >= 1 ? (strength === 1 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-neutral-700'}`} />
                <div className={`h-1 rounded transition-colors ${strength >= 2 ? (strength === 2 ? 'bg-amber-400' : 'bg-emerald-500') : 'bg-neutral-700'}`} />
                <div className={`h-1 rounded transition-colors ${strength >= 3 ? 'bg-emerald-500' : 'bg-neutral-700'}`} />
              </div>
              <div className="text-[9px] font-mono">
                {strength === 3 ? (
                  <span className="text-emerald-400">Strength: <strong>Strong (Tier 3/3)</strong> · ✓ 8+ chars · ✓ 1 number · ✓ 1 symbol</span>
                ) : strength === 2 ? (
                  <span className="text-amber-400">Strength: <strong>Medium (Tier 2/3)</strong> · Add symbols or numbers to strengthen</span>
                ) : strength === 1 ? (
                  <span className="text-amber-500">Strength: <strong>Fair (Tier 1/3)</strong> · Minimum 8 characters required</span>
                ) : (
                  <span className="text-red-400">Strength: <strong>Weak (Tier 0/3)</strong> · Please enter a secure password</span>
                )}
              </div>
            </div>

            {/* Inline Non-Blocking OTP */}
            <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-lg space-y-2">
              <span className="text-[11px] font-bold uppercase block">
                2 · INLINE OTP VERIFICATION
              </span>
              <p className="text-[10px] text-neutral-400">Code sent to {emailInput}</p>

              <div className="flex justify-between gap-1.5 pt-1">
                {['9', '7', '0', '0', '2', '3'].map((digit, i) => (
                  <span
                    key={i}
                    className="w-9 h-10 bg-neutral-800 border border-neutral-600 rounded flex items-center justify-center font-mono font-bold text-sm text-white"
                  >
                    {digit}
                  </span>
                ))}
              </div>

              {/* Inline Non-Blocking Recovery Alert */}
              <div className="flex items-start gap-1.5 text-[9px] text-amber-300 font-mono bg-amber-950/40 p-2 rounded border border-amber-800/60 mt-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                <span>
                  Code expiring in 02:45. Non-blocking error recovery: you can resend immediately below.
                </span>
              </div>
            </div>

            {/* Normalized 48px Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleRightAction('navigate', 'returns')}
                className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors shadow-md"
              >
                VERIFY & SIGN IN
              </button>

              <button
                onClick={() => alert('New OTP code sent to your email!')}
                className="w-full h-12 border border-neutral-600 text-neutral-200 font-bold uppercase tracking-widest text-xs rounded hover:border-white transition-colors"
              >
                RESEND NEW CODE (AVAILABLE NOW)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
