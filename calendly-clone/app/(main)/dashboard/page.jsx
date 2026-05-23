"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { usernameSchema } from "@/app/lib/validators";
import { getLatestUpdates } from "@/actions/dashboard";
import { format } from "date-fns";
import { Clock, Link as LinkIcon, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    if (user?.username) {
      setValue("username", user.username);
    }
  }, [isLoaded, user?.username, setValue]);

  const {
    loading: loadingUpdates,
    data: upcomingMeetings,
    fn: fnUpdates,
  } = useFetch(getLatestUpdates);

  useEffect(() => {
    if (isLoaded) {
      fnUpdates();
    }
  }, [isLoaded, fnUpdates]);

  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  const onSubmit = async (data) => {
    await fnUpdateUsername(data.username);
  };

  return (
    <div className="space-y-8">
      <ScrollReveal delay={0}>
        <Card className="glass-card shadow-sm border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800/30 py-5">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              <span>Welcome back, {user?.firstName || "Scheduler"}!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {!loadingUpdates ? (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Upcoming Appointments</h3>
                {upcomingMeetings && upcomingMeetings?.length > 0 ? (
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    {upcomingMeetings?.map((meeting) => (
                      <div key={meeting.id} className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 dark:border-slate-850 dark:bg-slate-900/50 shadow-sm flex items-start gap-3.5 hover:scale-[1.01] transition-transform">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                          <Clock size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold leading-snug mb-1 text-slate-800 dark:text-slate-200">{meeting.event.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-semibold">
                            {format(new Date(meeting.startTime), "MMM d, yyyy @ h:mm a")}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-semibold">
                            Host details: {meeting.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/20">
                    <p className="text-sm text-slate-455 font-semibold dark:text-slate-450">No upcoming meetings scheduled yet.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 font-semibold text-slate-450 animate-pulse">Loading updates...</div>
            )}
          </CardContent>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Card className="glass-card shadow-sm border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800/30 py-5">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-primary" />
              <span>Your Unique Link</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-550 mb-2">Configure URL username</label>
                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all dark:border-slate-800 dark:bg-slate-900/40">
                  <span className="text-slate-500 text-sm select-none font-semibold pr-1">{origin}/</span>
                  <Input 
                    {...register("username")} 
                    placeholder="username" 
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-bold text-slate-800 dark:text-slate-100 w-full"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1.5 font-semibold">
                    {errors.username.message}
                  </p>
                )}
                {error && (
                  <p className="text-red-500 text-xs mt-1.5 font-semibold">{error?.message}</p>
                )}
              </div>
              {loading && (
                <BarLoader className="mb-2 rounded-full overflow-hidden" width={"100%"} color="#3b82f6" />
              )}
              <Button type="submit" disabled={loading} className="px-5 font-bold hover:scale-[1.02] active:scale-95 transition-all text-xs py-2 h-9">
                Update Username
              </Button>
            </form>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
