"use client";

import { deleteEvent } from "@/actions/events";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { Link, Trash2, Clock, Users, Globe, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventCard({ event, username, isPublic = false }) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const description = event.description?.trim() || "No description provided.";
  const previewDescription =
    description.length > 180
      ? `${description.slice(0, 177).trimEnd()}...`
      : description;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window?.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent);

  const handleDelete = async () => {
    if (window?.confirm("Are you sure you want to delete this event?")) {
      await fnDeleteEvent(event.id);
      router.refresh();
    }
  };

  const handleCardClick = (e) => {
    if (
      e.target.tagName !== "BUTTON" &&
      e.target.tagName !== "SVG" &&
      e.target.parentElement?.tagName !== "BUTTON"
    ) {
      window?.open(
        `${window?.location.origin}/${username}/${event.id}`,
        "_blank"
      );
    }
  };

  return (
    <Card
      className="glass-card flex flex-col justify-between h-full cursor-pointer border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700/80 transition-all duration-300 overflow-hidden group"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3 px-6 pt-5">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-xl font-bold tracking-tight text-slate-850 dark:text-slate-100 group-hover:text-primary transition-colors leading-tight">
            {event.title}
          </CardTitle>
          
          {/* Public / Private Badges */}
          <div className="shrink-0">
            {event.isPrivate ? (
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-red-650 bg-red-500/10 px-2 py-0.5 rounded-full uppercase dark:text-red-400">
                <Lock size={10} />
                <span>Private</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-650 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase dark:text-emerald-400">
                <Globe size={10} />
                <span>Public</span>
              </span>
            )}
          </div>
        </div>

        <CardDescription className="flex items-center gap-4 pt-2.5 text-xs text-slate-450 dark:text-slate-400 font-bold">
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-slate-400 dark:text-slate-500" />
            <span>{event.duration} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} className="text-slate-400 dark:text-slate-500" />
            <span>{event._count?.bookings || 0} Bookings</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-5 flex-1">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          {previewDescription}
        </p>
      </CardContent>

      {isPublic ? (
        <CardFooter className="pt-3 border-t border-slate-100 dark:border-slate-800/30 bg-slate-50/40 dark:bg-slate-900/30 px-6 py-4">
          <Button
            className="w-full flex items-center justify-center font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white dark:bg-blue-650 dark:hover:bg-blue-600 hover:scale-[1.01] active:scale-95 transition-all py-2 h-9"
          >
            <span>Book Session</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className="flex gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/30 bg-slate-50/40 dark:bg-slate-900/30 px-6 py-4">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center font-bold text-xs border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 hover:scale-[1.01] active:scale-95 transition-all py-2 h-9"
          >
            <Link className="mr-1.5 h-3.5 w-3.5" />
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center justify-center font-bold text-xs hover:scale-[1.01] active:scale-95 transition-all py-2 h-9 px-3"
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            {loading ? "Deleting" : "Delete"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
