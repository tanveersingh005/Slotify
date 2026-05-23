import { Suspense } from "react";
import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/event-card";
import ScrollReveal from "@/components/scroll-reveal";
import { Plus, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 font-semibold text-slate-550 dark:text-slate-450 animate-pulse">Loading events...</div>}>
      <Events />
    </Suspense>
  );
}

async function Events() {
  const { events, username } = await getUserEvents();

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 shadow-sm max-w-2xl mx-auto">
        <CalendarDays className="w-14 h-14 text-slate-400 dark:text-slate-600 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-slate-850 dark:text-slate-200 mb-2">Create your first event</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md font-semibold">
          Create your first scheduling slot event (e.g. 15-minute quick call, 30-minute discovery) to start sharing your booking page.
        </p>
        <Link href="/events?create=true">
          <Button className="flex items-center gap-2 font-bold hover:scale-[1.02] active:scale-95 transition-all text-xs py-2 h-9">
            <Plus size={14} />
            <span>Create First Event</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <ScrollReveal>
      <div className="flex flex-col gap-6">
        
        {/* Custom Premium Sub-header control panel */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm transition-colors duration-300">
          <div>
            <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 tracking-tight">Manage Your Event Slots</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Configure custom duration templates, set privacy configurations, and share public links.</p>
          </div>
          <Link href="/events?create=true" className="w-fit">
            <Button size="sm" className="flex items-center gap-1.5 font-bold hover:scale-[1.02] active:scale-95 transition-all text-xs py-2 px-3.5 h-8.5 shadow-sm bg-blue-600 hover:bg-blue-500 text-white dark:bg-blue-650 dark:hover:bg-blue-600">
              <Plus size={14} />
              <span>Create Event</span>
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} username={username} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
