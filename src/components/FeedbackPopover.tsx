"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/Popover";
import { useState } from "react";

export const FeedbackPopover = () => {
  const [feedback, setFeedback] = useState<string>("");

  const handleSendFeedback = () => {
    if (!feedback.trim) return;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ message: feedback }),
    }).then(() => {
      setFeedback("");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-sm bg-slate-200 border border-slate-300 rounded px-2 py-1 text-black">
          Gi tilbakemelding
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-2 border border-slate-200 w-72">
        <div className="flex flex-col space-y-2">
          <h4 className="text-sm font-medium">Gi tilbakemelding (anonymt)</h4>
          <div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.currentTarget.value)}
              name="name"
              id="name"
              className="border border-slate-200 rounded-md p-2 text-sm w-full h-28 outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
          <div>
            <button
              className="text-sm bg-sky-600 rounded px-2 py-1 text-white"
              onClick={handleSendFeedback}
            >
              Send
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
