import { notFound } from "next/navigation";
import { getUserByUsername } from "@/actions/users";
import EventCard from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollReveal from "@/components/scroll-reveal";
import { Sparkles, CalendarDays } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name}'s Profile | Schedulrr`,
    description: `Book an event with ${user.name}. View available public events and schedules.`,
  };
}

export default async function UserProfilePage({ params }) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16 md:py-20">
      <ScrollReveal delay={0}>
        <div className="flex flex-col items-center text-center mb-14 max-w-xl mx-auto">
          {/* Sparkles verified host pill */}
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-yellow-600 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/10 mb-4 animate-pulse dark:text-yellow-500">
            <Sparkles size={11} className="fill-current" />
            <span>Verified Organizer</span>
          </div>

          <Avatar className="w-20 h-20 border-2 border-primary/20 dark:border-primary/40 ring-4 ring-slate-100 dark:ring-slate-900 shadow-md mb-4 hover:scale-105 transition-transform duration-300">
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback className="font-bold text-xl bg-primary/5 text-primary">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white leading-tight mb-2">
            {user.name}
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm leading-relaxed">
            Welcome to my scheduling page. Please select an event below to book a session with me.
          </p>
        </div>
      </ScrollReveal>

      {user.events.length === 0 ? (
        <ScrollReveal delay={0.1}>
          <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/20 max-w-lg mx-auto">
            <CalendarDays className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-450">No public events available at the moment.</p>
          </div>
        </ScrollReveal>
      ) : (
        <ScrollReveal delay={0.1}>
          <div className={`grid gap-8 grid-cols-1 ${
            user.events.length === 1 
              ? "max-w-xl mx-auto" 
              : user.events.length === 2 
                ? "md:grid-cols-2 max-w-4xl mx-auto" 
                : "md:grid-cols-2 lg:grid-cols-3"
          }`}>
            {user.events.map((event) => (
              <div key={event.id} className="h-full flex flex-col">
                <EventCard
                  event={event}
                  username={params.username}
                  isPublic
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
