import { Suspense } from "react";
import { getUserMeetings } from "@/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingList from "./_components/meeting-list";
import ScrollReveal from "@/components/scroll-reveal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your Meetings | Schedulrr",
  description: "View and manage your upcoming and past meetings.",
};

export default async function MeetingsPage() {
  return (
    <ScrollReveal>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-1 rounded-xl w-fit">
          <TabsTrigger value="upcoming" className="rounded-lg font-bold px-6 py-2 transition-all text-xs">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="rounded-lg font-bold px-6 py-2 transition-all text-xs">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense fallback={<div className="text-center py-12 font-semibold text-slate-500 dark:text-slate-450 animate-pulse text-xs">Loading upcoming meetings...</div>}>
            <UpcomingMeetings />
          </Suspense>
        </TabsContent>
        <TabsContent value="past">
          <Suspense fallback={<div className="text-center py-12 font-semibold text-slate-500 dark:text-slate-450 animate-pulse text-xs">Loading past meetings...</div>}>
            <PastMeetings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </ScrollReveal>
  );
}

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingList meetings={meetings} type="upcoming" />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingList meetings={meetings} type="past" />;
}
