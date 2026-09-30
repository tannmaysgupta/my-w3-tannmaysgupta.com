"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { chapters } from "@/lib/content/chapters";
import { profile } from "@/lib/content/profile";

export function PortfolioNavigation() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <header className="portfolio-nav print:hidden">
      <nav aria-label="Main">
        <Link href="/" className="nav-name">
          {profile.name}
          <span>Product · Design · Insurance</span>
        </Link>
        <div className="nav-links">
          {chapters.map((chapter) => (
            <Link key={chapter.id} href={`/#${chapter.id}`}>
              {chapter.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="index-button"
          onClick={() => dialog.current?.showModal()}
          aria-haspopup="dialog"
          aria-label="Open site index"
        >
          <span>Index</span>
          <span className="index-icon" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>
      </nav>
      <dialog ref={dialog} className="index-dialog" aria-labelledby="menu-title">
        <div className="dialog-heading">
          <h2 id="menu-title">A few sides of the same person.</h2>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close site index"
          >
            <X size={26} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Site index" className="dialog-links">
          {chapters.map((chapter) => (
            <Link
              className={`palette-${chapter.id}`}
              key={chapter.id}
              href={`/#${chapter.id}`}
              onClick={() => dialog.current?.close()}
            >
              <span className="micro">{chapter.number}</span>
              <span>{chapter.label}</span>
              <ArrowUpRight size={30} strokeWidth={1.3} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="dialog-footer">
          <span>Curiosity connects it all.</span>
          <Link href="/resume" onClick={() => dialog.current?.close()}>
            View résumé ↗
          </Link>
        </div>
      </dialog>
    </header>
  );
}
