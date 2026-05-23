import { Calendar, Clock, Video, Globe, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EventDetails({ event }) {
  const { user } = event;
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-yellow-600 bg-yellow-500/10 px-2.5 py-0.5 rounded-full border border-yellow-500/10 mb-3 animate-pulse dark:text-yellow-500">
          <Sparkles size={10} className="fill-current" />
          <span>Verified Organizer</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-tight">
          {event.title}
        </h1>
      </div>

      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-150 bg-slate-50/50 dark:border-slate-800/40 dark:bg-slate-950/20">
        <Avatar className="w-11 h-11 border-2 border-primary/20 dark:border-primary/40 ring-2 ring-white dark:ring-slate-900 shadow-sm">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback className="font-bold text-base bg-primary/5 text-primary">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none mb-1">{user.name}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-450 leading-none">/{user.username}</p>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center text-xs font-semibold text-slate-650 dark:text-slate-400">
          <Clock className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span>{event.duration} minutes slot duration</span>
        </div>
        <div className="flex items-center text-xs font-semibold text-slate-650 dark:text-slate-400">
          <Video className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span>Google Meet video invitation</span>
        </div>
        <div className="flex items-center text-xs font-semibold text-slate-650 dark:text-slate-400">
          <Globe className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span>Virtual Meeting Room</span>
        </div>
      </div>

      {event.description && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40">
          <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-2">Description Notes</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            {event.description}
          </p>
        </div>
      )}
    </div>
  );
}
