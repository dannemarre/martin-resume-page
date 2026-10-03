import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { GA4_MEASUREMENT_ID, readConsent, setConsent } from "~/lib/analytics";

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA4_MEASUREMENT_ID) return;
    setOpen(readConsent() === null);
  }, []);

  if (!open || !GA4_MEASUREMENT_ID) return null;

  const onAccept = () => {
    setConsent("granted");
    setOpen(false);
  };
  const onDecline = () => {
    setConsent("denied");
    setOpen(false);
  };

  return (
    <section
      aria-label="Analytics consent"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-md border border-zinc-200 bg-white p-5 shadow-lg sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
    >
      <p className="text-sm leading-relaxed text-zinc-700">
        I use Google Analytics to understand how visitors land on this site. No ads, no personal
        profile, just aggregate counts.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={onAccept} size="sm">
          Accept
        </Button>
        <Button onClick={onDecline} size="sm" variant="outline">
          Decline
        </Button>
      </div>
    </section>
  );
}
