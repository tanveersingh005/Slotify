import EventCard from "@/components/event-card";
import { getPublicEvents } from "@/actions/events";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollReveal from "@/components/scroll-reveal";
import { Compass, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Book a Session | Schedulrr",
  description: "Browse public event types and book available time slots.",
};

export const dynamic = "force-dynamic";

export default async function BookPage() {
  let events = [];
  let databaseError = null;

  try {
    events = await getPublicEvents();
  } catch (error) {
    console.error("Failed to load public events:", error);
    databaseError = error;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
      <ScrollReveal delay={0}>
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary px-3 py-1 rounded-full border border-primary/10 bg-primary/5 mb-3.5">
            <Compass size={12} className="text-primary animate-pulse" />
            <span>Explore Public Slots</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-650 to-cyan-500 bg-clip-text text-transparent pb-2 leading-tight">
            Book a Session
          </h1>
          <p className="text-slate-550 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed mt-1">
            Choose a public event type from anyone on the platform and pick a time that works for you.
          </p>
        </div>
      </ScrollReveal>

      {databaseError ? (
        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center shadow-sm dark:border-red-900/30 dark:bg-red-950/10 max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-2">Booking directory unavailable</h2>
            <p className="text-sm text-slate-500">
              We could not connect to the database right now. Please try again in a moment.
            </p>
          </div>
        </ScrollReveal>
      ) : events.length === 0 ? (
        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/30 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-2">No public events available</h2>
            <p className="text-sm text-slate-500 font-semibold">
              Public events will appear here once users create event types and set them to public.
            </p>
          </div>
        </ScrollReveal>
      ) : (
        <ScrollReveal delay={0.1}>
          <div className={`grid gap-8 grid-cols-1 ${
            events.length === 1 
              ? "max-w-2xl mx-auto" 
              : events.length === 2 
                ? "md:grid-cols-2 max-w-5xl" 
                : "md:grid-cols-2 lg:grid-cols-3"
          }`}>
            {events.map((event) => (
              <div key={event.id} className="flex flex-col gap-3 group h-full">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200/60 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 w-fit transition-all duration-200 group-hover:scale-[1.01]">
                  <Avatar className="h-6 w-6 border border-slate-100 dark:border-slate-800">
                    <AvatarImage src={event.user.imageUrl} alt={event.user.name} />
                    <AvatarFallback className="text-[9px] font-bold bg-primary/5 text-primary">
                      {event.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{event.user.name}</span>
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                      /{event.user.username}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <EventCard
                    event={event}
                    username={event.user.username}
                    isPublic
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
