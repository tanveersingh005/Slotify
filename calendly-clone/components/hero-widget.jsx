"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Video, 
  Globe, 
  User,
  ArrowRight,
  MousePointer2,
  Video as VideoIcon,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

export default function HeroInteractiveWidget() {
  const [step, setStep] = useState(0); // 0: Idle/Date select, 1: Date Selected, 2: Time Selected, 3: Confirmed
  const [cursorPos, setCursorPos] = useState({ x: 15, y: 15, opacity: 1, clicked: false });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Auto-running interactive loop simulating the Acme Inc Fatima Sy booking page
  useEffect(() => {
    let active = true;
    
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const runLoop = async () => {
      while (active) {
        // --- STATE 0: INITIAL RESET ---
        if (!active) break;
        setStep(0);
        setSelectedDate(null);
        setSelectedTime(null);
        setCursorPos({ x: 20, y: 20, opacity: 0, clicked: false });
        await sleep(800);

        // Move to Day 22 on calendar
        if (!active) break;
        setCursorPos({ x: 52, y: 62, opacity: 1, clicked: false }); // Position near Day 22
        await sleep(1500);

        // Click Day 22
        if (!active) break;
        setCursorPos(prev => ({ ...prev, clicked: true }));
        setSelectedDate(22);
        setStep(1); // Reveal timeslots panel on the right
        await sleep(250);
        setCursorPos(prev => ({ ...prev, clicked: false }));
        await sleep(800);

        // Move cursor to 11:00 AM slot
        if (!active) break;
        setCursorPos({ x: 88, y: 48, opacity: 1, clicked: false }); // Position near 11:00 AM slot
        await sleep(1400);

        // Click 11:00 AM slot
        if (!active) break;
        setCursorPos(prev => ({ ...prev, clicked: true }));
        setSelectedTime("11:00am");
        setStep(2); // Show Confirm button next to it
        await sleep(250);
        setCursorPos(prev => ({ ...prev, clicked: false }));
        await sleep(800);

        // Move cursor to "Confirm" button
        if (!active) break;
        setCursorPos({ x: 91, y: 48, opacity: 1, clicked: false }); // Move slightly right to Confirm
        await sleep(1200);

        // Click Confirm
        if (!active) break;
        setCursorPos(prev => ({ ...prev, clicked: true }));
        await sleep(250);
        setCursorPos(prev => ({ ...prev, clicked: false }));
        await sleep(300);

        // --- STATE 3: CONFIRMED SUCCESS ---
        if (!active) break;
        setStep(3); // Transition entire widget to success state
        setCursorPos({ x: 91, y: 48, opacity: 0, clicked: false });
        await sleep(4500); // Hold success state for 4.5 seconds
      }
    };

    runLoop();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative w-full max-w-[740px] h-[430px] flex flex-col justify-between rounded-3xl border border-slate-200/60 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/60 p-5 overflow-hidden group select-none transition-all duration-500">
      
      {/* 1. Mac Window Control Bar */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-900 pb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/90 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/90 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-green-400/90 shadow-sm" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 ml-2 tracking-wide font-medium">Share your booking page</span>
        </div>
        
        {/* Pulsing Live Simulation Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-[9px] text-[#006BFF] dark:text-[#3b82f6] font-extrabold uppercase tracking-wider animate-pulse shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006BFF] dark:bg-[#3b82f6]" />
          <span>Live Simulation</span>
        </div>
      </div>

      {/* 2. Main Responsive Screen Canvas */}
      <div className="w-full h-[calc(100%-38px)] relative text-slate-700 dark:text-slate-200 flex-1 flex flex-col justify-between">
        
        {step < 3 ? (
          <div className="grid grid-cols-12 gap-3 h-full items-stretch">
            
            {/* COLUMN 1: HOST INFORMATION PANEL (col-span-3) */}
            <div className="col-span-3 flex flex-col justify-between pr-3 border-r border-slate-150/80 dark:border-slate-800/50 text-left py-1">
              <div className="space-y-4">
                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L2 22h20L12 2zM12 6l7.5 13H4.5L12 6z" />
                    </svg>
                  </div>
                  <span className="text-xs font-black text-slate-800 dark:text-white tracking-wide">ACME Inc.</span>
                </div>

                {/* Host Profile Card */}
                <div className="space-y-2">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                    <Image 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                      alt="Fatima Sy" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">Fatima Sy</h5>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 leading-tight">Client Check-in</h4>
                  </div>
                </div>

                {/* Event Properties */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <Clock size={13} className="text-slate-400" />
                    <span>30 min</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <VideoIcon size={13} className="text-slate-400" />
                    <span>Zoom Meeting</span>
                  </div>
                </div>
              </div>

              {/* simulated text block placeholder lines */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-900/50">
                <div className="h-1.5 w-full rounded-full bg-slate-200/80 dark:bg-slate-800/80" />
                <div className="h-1.5 w-[85%] rounded-full bg-slate-200/80 dark:bg-slate-800/80" />
                <div className="h-1.5 w-[60%] rounded-full bg-slate-200/80 dark:bg-slate-800/80" />
              </div>
            </div>

            {/* COLUMN 2: CALENDAR PANEL (col-span-5) */}
            <div className={`flex flex-col justify-between py-1 px-2 ${step > 0 ? "col-span-5 border-r border-slate-150/80 dark:border-slate-800/50" : "col-span-9"}`}>
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 mb-1.5 text-left tracking-wide">Select a Date & Time</h4>
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">
                  <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300">July 2026</span>
                  <div className="flex gap-1.5">
                    <button className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-[9px] text-slate-400 font-bold">&lt;</button>
                    <button className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-[9px] text-slate-400 font-bold">&gt;</button>
                  </div>
                </div>

                {/* Day Columns Heading SUN-SAT */}
                <div className="grid grid-cols-7 gap-1.5 text-center mb-1">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, idx) => (
                    <span key={idx} className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{day}</span>
                  ))}
                </div>

                {/* Days Grid - July 2026 (Starts Wednesday, pad 3 empty days) */}
                <div className="grid grid-cols-7 gap-y-2 gap-x-1.5 text-center mt-1 items-center">
                  <span className="text-transparent py-1.5 text-[10.5px]"></span>
                  <span className="text-transparent py-1.5 text-[10.5px]"></span>
                  <span className="text-transparent py-1.5 text-[10.5px]"></span>

                  {[...Array(31)].map((_, idx) => {
                    const day = idx + 1;
                    const isSelected = selectedDate === day;
                    const isAvailable = day === 9 || day === 10 || day === 16 || day === 17 || day === 18 || day === 22 || day === 23 || day === 24 || day === 30 || day === 31;
                    
                    return (
                      <span 
                        key={idx} 
                        className={`text-[10.5px] font-bold py-1.5 rounded-full mx-auto w-6.5 h-6.5 flex items-center justify-center transition-all ${
                          isSelected 
                            ? "bg-[#006BFF] text-white scale-110 shadow-md shadow-[#006BFF]/25 font-black" 
                            : isAvailable 
                              ? "bg-blue-500/10 text-[#006BFF] hover:bg-[#006BFF] hover:text-white cursor-pointer font-black" 
                              : "text-slate-400 dark:text-slate-600 font-medium"
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Time Zone Indicator at Bottom */}
              <div className="text-[9.5px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-900/50">
                <Globe size={11} />
                <span>Eastern time - US & Canada</span>
              </div>
            </div>

            {/* COLUMN 3: TIME SLOTS PANEL (col-span-4) - Animates in upon date selection */}
            <div className={`col-span-4 flex flex-col justify-between py-1 pl-2 text-left transition-all duration-500 ${
              step > 0 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
            }`}>
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1 leading-none">Monday, July 22</h4>
                <p className="text-[9.5px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wide">Select your start time</p>
              </div>

              {/* Dynamic Timeslots list */}
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-0.5 my-2.5 no-scrollbar">
                {/* 10:00 AM Slot */}
                <div className="text-center py-2 text-xs font-extrabold rounded-xl border border-blue-500 bg-white hover:bg-slate-50 text-[#006BFF] dark:bg-slate-900 dark:hover:bg-slate-850 shadow-sm">
                  10:00am
                </div>

                {/* 11:00 AM Double Confirm Slot */}
                {selectedTime === "11:00am" ? (
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 text-center py-2 text-xs font-black rounded-xl border border-slate-800 bg-slate-800 text-white dark:border-slate-700 dark:bg-slate-800 shadow-sm">
                      11:00am
                    </div>
                    <button className="flex-1 text-center py-2 text-xs font-black rounded-xl bg-[#006BFF] hover:bg-[#0051C3] text-white shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all">
                      Confirm
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs font-extrabold rounded-xl border border-blue-500 bg-white hover:bg-slate-50 text-[#006BFF] dark:bg-slate-900 dark:hover:bg-slate-850 shadow-sm">
                    11:00am
                  </div>
                )}

                {/* Remaining Slots */}
                {["1:00pm", "2:30pm", "4:00pm"].map((time, idx) => (
                  <div key={idx} className="text-center py-2 text-xs font-extrabold rounded-xl border border-blue-500 bg-white hover:bg-slate-50 text-[#006BFF] dark:bg-slate-900 dark:hover:bg-slate-850 shadow-sm">
                    {time}
                  </div>
                ))}
              </div>

              {/* Info spacing filler */}
              <div className="h-4" />
            </div>

          </div>
        ) : (
          
          // --- COMPLETED SUCCESS STATE ---
          <div className="h-full flex flex-col items-center justify-center text-center p-2">
            <div className="w-13 h-13 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 animate-bounce shadow-md">
              <CheckCircle2 size={30} />
            </div>
            
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-1.5 leading-none">Booking Confirmed!</h4>
            <p className="text-xs font-semibold text-slate-450 dark:text-slate-400 max-w-[340px] mb-4">
              Your meeting with Fatima Sy has been successfully scheduled. A calendar invitation has been generated and dispatched to your email address.
            </p>

            <div className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-900 p-5 shadow-sm text-left">
              <div className="text-xs font-black text-[#006BFF] dark:text-[#3b82f6] uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">Client Check-in</div>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 leading-none">
                  <User size={13} className="text-slate-400" />
                  <span>Host: Fatima Sy</span>
                </p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 leading-none">
                  <Clock size={13} className="text-slate-400" />
                  <span>Duration: 30 Min</span>
                </p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 leading-none col-span-2">
                  <CalendarIcon size={13} className="text-slate-400" />
                  <span>Mon, July 22, 2026 @ 11:00 AM</span>
                </p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 leading-none col-span-2">
                  <VideoIcon size={13} className="text-slate-400" />
                  <span>Location: Zoom video integration</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- VIRTUAL MOUSE CURSOR --- */}
        <div 
          className="absolute pointer-events-none z-50 flex items-center justify-center transition-all duration-300 ease-in-out"
          style={{
            left: `${cursorPos.x}%`,
            top: `${cursorPos.y}%`,
            opacity: cursorPos.opacity,
            transform: cursorPos.clicked ? "scale(0.85)" : "scale(1)"
          }}
        >
          <MousePointer2 size={20} className="text-white fill-white drop-shadow-md -rotate-[22deg]" />
          {cursorPos.clicked && (
            <span className="absolute -inset-1.5 rounded-full border-2 border-primary/60 dark:border-primary/80 animate-ping opacity-75" />
          )}
        </div>

      </div>
    </div>
  );
}

function ChevronRightMini() {
  return (
    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
