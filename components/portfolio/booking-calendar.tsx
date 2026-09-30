"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const calLink = "tannmaysgupta/connect";
const namespace = "portfolio-conversation";

export function BookingCalendar() {
  const container = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let active = true;
    void getCalApi({ namespace }).then((cal) => {
      if (!active) return;
      cal("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#263e35",
            "cal-brand-emphasis": "#1b3028",
            "cal-brand-text": "#eff0e8",
            "cal-brand-accent": "#eff0e8",
            "cal-bg": "#eff0e8",
            "cal-bg-subtle": "#e5e9df",
            "cal-bg-muted": "#eff0e8",
            "cal-bg-emphasis": "#d5dfd3",
            "cal-text": "#263e35",
            "cal-text-emphasis": "#263e35",
            "cal-text-subtle": "#4f6257",
            "cal-text-muted": "#59695e",
            "cal-border": "#86998b",
            "cal-border-emphasis": "#263e35",
            "cal-border-subtle": "#c3cec0",
            "cal-border-booker": "#c3cec0",
          },
          dark: {
            "cal-brand": "#acd0b9",
            "cal-brand-emphasis": "#c1dccb",
            "cal-brand-text": "#263e35",
            "cal-brand-accent": "#263e35",
          },
        },
      });
    });
    return () => {
      active = false;
    };
  }, [visible]);

  return (
    <section
      id="book-a-conversation"
      className="contact-booking"
      aria-labelledby="booking-title"
      ref={container}
    >
      <div className="booking-heading">
        <div>
          <span className="micro">A little time. A good conversation.</span>
          <h3 id="booking-title">Find a time to talk.</h3>
        </div>
        <a href={`https://cal.com/${calLink}`} target="_blank" rel="noopener noreferrer">
          Open calendar in a new tab <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="booking-widget">
        {visible ? (
          <Cal
            namespace={namespace}
            calLink={calLink}
            calOrigin="https://app.cal.com"
            config={{ layout: "month_view", theme: "light", "ui.autoscroll": "false" }}
            style={{ width: "100%", minHeight: "540px", overflow: "auto" }}
          />
        ) : (
          <div className="booking-placeholder">A conversation starts here.</div>
        )}
      </div>
    </section>
  );
}
