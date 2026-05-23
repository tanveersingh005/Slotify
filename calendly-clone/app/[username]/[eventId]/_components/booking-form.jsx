"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/actions/bookings";
import { bookingSchema } from "@/app/lib/validators";
import "react-day-picker/style.css";
import useFetch from "@/hooks/use-fetch";
import { CheckCircle2, Video, Calendar as CalendarIcon, Clock, User, Mail, AlignLeft, Info } from "lucide-react";
import { BarLoader } from "react-spinners";

export default function BookingForm({ event, availability }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);

    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  // Availability lookup
  const availableDays = availability.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  if (data) {
    return (
      <div className="text-center p-8 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl bg-white dark:bg-slate-900/60 shadow-lg flex flex-col items-center justify-center min-h-[350px]">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 animate-bounce shadow-sm">
          <CheckCircle2 size={28} />
        </div>
        
        <h2 className="text-2xl font-extrabold text-slate-850 dark:text-white leading-tight mb-2">Booking successful!</h2>
        
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-xs mb-6 leading-relaxed">
          An invitation details receipt has been created and dispatched to your email address.
        </p>

        {data.meetLink && (
          <Button asChild className="font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all py-2.5 h-10 shadow-sm flex items-center gap-2 px-6">
            <a
              href={data.meetLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Video className="w-4 h-4" />
              <span>Join Google Meet Video</span>
            </a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6 md:min-h-[380px]">
        {/* Calendar Picker Wrapper */}
        <div className="flex-1 flex justify-center border border-slate-200/60 bg-white rounded-2xl p-4 dark:border-slate-800 dark:bg-slate-950/20 shadow-sm">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null); // Reset time when date changes
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              available: {
                background: "rgba(59, 130, 246, 0.12)",
                color: "#2563eb",
                fontWeight: "extrabold",
                borderRadius: "100%",
              },
            }}
          />
        </div>

        {/* Time Slots Selection Pane */}
        <div className="flex-1 border border-slate-200/60 bg-white rounded-2xl p-5 dark:border-slate-800 dark:bg-slate-950/20 shadow-sm max-h-[380px] overflow-y-auto no-scrollbar">
          {selectedDate ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest leading-none mb-1">Available Slots</h3>
                <p className="text-[10px] text-slate-455 font-semibold dark:text-slate-500">Pick a starting time for Mon, {format(selectedDate, "MMM d")}</p>
              </div>
              
              {timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <Button
                        key={slot}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => setSelectedTime(slot)}
                        className={`text-xs font-bold py-2 h-9 rounded-lg transition-all ${
                          isSelected
                            ? "shadow-sm scale-[1.01]"
                            : "border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        <Clock size={12} className="mr-1.5 shrink-0" />
                        <span>{slot}</span>
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Info className="w-8 h-8 text-slate-355 mx-auto mb-2 dark:text-slate-650" />
                  <p className="text-xs font-semibold text-slate-450 dark:text-slate-500">No available hours left on this day.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <CalendarIcon className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Pick a Date</h4>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 max-w-[200px] leading-relaxed">
                Select an active day on the calendar to discover available slots
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Inputs Form */}
      {selectedTime && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-slate-200/60 bg-white rounded-2xl p-5 dark:border-slate-800 dark:bg-slate-950/20 shadow-sm transition-all duration-300">
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest leading-none mb-1">Guest Credentials</h3>
            <p className="text-[10px] text-slate-455 font-semibold dark:text-slate-500 mb-4">Complete details to reserve your time slot</p>
          </div>

          <div className="space-y-3.5">
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <Input 
                {...register("name")} 
                placeholder="Your Name" 
                className="pl-10 rounded-lg border border-slate-200 bg-white/50 px-3.5 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 transition-all shadow-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.name.message}</p>
              )}
            </div>

            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                {...register("email")}
                type="email"
                placeholder="Your Email"
                className="pl-10 rounded-lg border border-slate-200 bg-white/50 px-3.5 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 transition-all shadow-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <AlignLeft className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <Textarea
                {...register("additionalInfo")}
                placeholder="Additional Notes or Questions"
                className="pl-10 rounded-lg border border-slate-200 bg-white/50 px-3.5 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 transition-all shadow-sm min-h-[90px]"
              />
            </div>
          </div>

          {loading && (
            <BarLoader className="mb-2 rounded-full overflow-hidden" width={"100%"} color="#3b82f6" />
          )}

          <Button type="submit" disabled={loading} className="w-full font-bold text-xs hover:scale-[1.01] active:scale-95 transition-all py-2.5 h-10 shadow-sm flex items-center justify-center gap-1.5">
            <CheckCircle2 size={14} />
            <span>Schedule Appointment</span>
          </Button>
        </form>
      )}
    </div>
  );
}
