"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { updateAvailability } from "@/actions/availability";
import { availabilitySchema } from "@/app/lib/validators";
import { timeSlots } from "../data";
import useFetch from "@/hooks/use-fetch";
import ScrollReveal from "@/components/scroll-reveal";
import { Clock, ArrowRight, Save } from "lucide-react";
import { BarLoader } from "react-spinners";

export default function AvailabilityForm({ initialData }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  const {
    loading,
    error,
    fn: fnupdateAvailability,
  } = useFetch(updateAvailability);

  const onSubmit = async (data) => {
    await fnupdateAvailability(data);
  };

  return (
    <ScrollReveal>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ].map((day) => {
            const isAvailable = watch(`${day}.isAvailable`);

            return (
              <div 
                key={day} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-300 gap-4 ${
                  isAvailable 
                    ? "border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60" 
                    : "border-slate-100 bg-slate-50/50 opacity-60 dark:border-slate-900/20 dark:bg-slate-950/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Controller
                    name={`${day}.isAvailable`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id={`${day}-checkbox`}
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          setValue(`${day}.isAvailable`, checked);
                          if (!checked) {
                            setValue(`${day}.startTime`, "09:00");
                            setValue(`${day}.endTime`, "17:00");
                          }
                        }}
                        className="h-4.5 w-4.5 rounded border-slate-300 text-primary dark:border-slate-700"
                      />
                    )}
                  />
                  <label htmlFor={`${day}-checkbox`} className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize select-none cursor-pointer">
                    {day}
                  </label>
                </div>

                {isAvailable ? (
                  <div className="flex items-center gap-2.5">
                    <Controller
                      name={`${day}.startTime`}
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-28 text-xs font-semibold border-slate-250 dark:border-slate-800 h-9 rounded-lg">
                            <SelectValue placeholder="Start Time" />
                          </SelectTrigger>
                          <SelectContent className="max-h-56">
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time} className="text-xs font-semibold">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <span className="text-[10px] uppercase font-bold text-slate-400">to</span>
                    <Controller
                      name={`${day}.endTime`}
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-28 text-xs font-semibold border-slate-250 dark:border-slate-800 h-9 rounded-lg">
                            <SelectValue placeholder="End Time" />
                          </SelectTrigger>
                          <SelectContent className="max-h-56">
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time} className="text-xs font-semibold">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors[day]?.endTime && (
                      <span className="text-red-500 text-xs font-semibold ml-2">
                        {errors[day].endTime.message}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Unavailable for bookings</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Buffer Settings Card */}
        <Card className="glass-card shadow-sm border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-450 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-850 dark:text-slate-200 leading-none mb-1">Appointment Buffer Gaps</h4>
                  <p className="text-[10px] text-slate-450 dark:text-slate-400 leading-none">Configure required prep time between consecutive slots</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-slate-250 bg-slate-50/50 px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all dark:border-slate-800 dark:bg-slate-900/40 w-fit">
                  <Input
                    type="number"
                    {...register("timeGap", {
                      valueAsNumber: true,
                    })}
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-bold text-slate-800 dark:text-slate-100 w-16 text-center"
                  />
                  <span className="text-slate-450 text-xs font-bold pl-1.5 border-l border-slate-250 dark:border-slate-800 select-none">mins</span>
                </div>

                {errors.timeGap && (
                  <span className="text-red-500 text-xs font-semibold leading-none">{errors.timeGap.message}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {error && <div className="text-red-500 text-xs font-semibold">{error?.message}</div>}
        
        {loading && (
          <BarLoader className="mb-2 rounded-full overflow-hidden" width={"100%"} color="#3b82f6" />
        )}

        <Button type="submit" disabled={loading} className="px-6 font-bold hover:scale-[1.02] active:scale-95 transition-all text-xs py-2.5 h-10 shadow-sm flex items-center gap-2">
          <Save size={14} />
          <span>Save Weekly Settings</span>
        </Button>
      </form>
    </ScrollReveal>
  );
}
