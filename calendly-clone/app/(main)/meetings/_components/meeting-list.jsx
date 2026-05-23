import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video, User } from "lucide-react";
import CancelMeetingButton from "./cancel-meeting";
import { Button } from "@/components/ui/button";

export default function MeetingList({ meetings, type }) {
  if (meetings.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/20 max-w-lg mx-auto">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-450">No {type} meetings found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className="glass-card flex flex-col justify-between border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm hover:scale-[1.01] transition-transform overflow-hidden">
          <CardHeader className="pb-3 px-6 pt-5">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1">
              {meeting.event.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold pt-0.5">
              <User size={12} className="text-slate-400" />
              <span>Host: {meeting.name}</span>
            </CardDescription>
            {meeting.additionalInfo && (
              <blockquote className="mt-2 text-xs italic text-slate-500 dark:text-slate-450 border-l-2 border-primary/45 pl-3 py-1 bg-slate-50/50 dark:bg-slate-900/30 rounded-r-md">
                &quot;{meeting.additionalInfo}&quot;
              </blockquote>
            )}
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="space-y-2 mt-2">
              <div className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                <span>{format(new Date(meeting.startTime), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                <Clock className="mr-2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                <span>
                  {format(new Date(meeting.startTime), "h:mm a")} -{" "}
                  {format(new Date(meeting.endTime), "h:mm a")}
                </span>
              </div>
            </div>
            {meeting.meetLink && (
              <Button asChild size="sm" className="w-full flex items-center justify-center font-bold text-xs hover:scale-[1.01] active:scale-95 transition-all mt-4 h-8.5 shadow-sm">
                <a
                  href={meeting.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Video className="mr-1.5 h-3.5 w-3.5" />
                  <span>Join Video Call</span>
                </a>
              </Button>
            )}
          </CardContent>
          {type === "upcoming" && (
            <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800/30 bg-slate-50/40 dark:bg-slate-900/30 px-6 py-3">
              <CancelMeetingButton meetingId={meeting.id} />
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
