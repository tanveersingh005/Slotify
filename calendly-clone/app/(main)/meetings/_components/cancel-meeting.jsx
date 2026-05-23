"use client";

import { Button } from "@/components/ui/button";
import { cancelMeeting } from "@/actions/meetings";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";

export default function CancelMeetingButton({ meetingId }) {
  const router = useRouter();

  const { loading, error, fn: fnCancelMeeting } = useFetch(cancelMeeting);

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this meeting?")) {
      await fnCancelMeeting(meetingId);
      router.refresh();
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <Button 
        variant="destructive" 
        onClick={handleCancel} 
        disabled={loading}
        className="w-full font-bold text-xs hover:scale-[1.01] active:scale-95 transition-all py-1.5 h-8"
      >
        {loading ? "Canceling..." : "Cancel Meeting"}
      </Button>
      {error && <span className="text-red-500 text-xs mt-1 font-semibold text-center">{error.message}</span>}
    </div>
  );
}
