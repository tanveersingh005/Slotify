import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventDetails } from "@/actions/events";
import { getEventAvailability } from "@/actions/availability";
import EventDetails from "./_components/event-details";
import BookingForm from "./_components/booking-form";
import ScrollReveal from "@/components/scroll-reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Schedulrr`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }) {
  const event = await getEventDetails(params.username, params.eventId);
  const availability = await getEventAvailability(params.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-16 md:py-24">
      <ScrollReveal delay={0}>
        <div className="flex flex-col lg:flex-row border border-slate-200/60 bg-white/80 shadow-lg dark:border-slate-800/80 dark:bg-slate-900/60 rounded-3xl overflow-hidden backdrop-blur-md transition-colors duration-300">
          <div className="flex-1 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/60">
            <EventDetails event={event} />
          </div>
          <div className="flex-1 p-6 md:p-10 bg-slate-50/20 dark:bg-slate-950/15">
            <Suspense fallback={<div className="text-center py-12 font-semibold text-slate-550 dark:text-slate-450 animate-pulse text-xs">Loading booking scheduler...</div>}>
              <BookingForm event={event} availability={availability} />
            </Suspense>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
