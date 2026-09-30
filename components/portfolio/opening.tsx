"use client";

import { ArrowDown, ArrowUpRight, RotateCw } from "lucide-react";
import { type CSSProperties, useEffect, useState } from "react";
import { openingQuotes, pickQuoteIndex } from "@/lib/content/opening-quotes";

const storageKey = "tannmay-opening-quote";

function randomQuote(previous: number | null) {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return pickQuoteIndex(bytes[0] / 2 ** 32, previous);
}

export function Opening() {
  const [index, setIndex] = useState<number | null>(null);
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    let previous: number | null = null;
    try {
      const saved = sessionStorage.getItem(storageKey);
      previous = saved === null ? null : Number(saved);
    } catch {
      // The opening also works when browser storage is disabled.
    }
    const next = randomQuote(previous);
    setIndex(next);
    try {
      sessionStorage.setItem(storageKey, String(next));
    } catch {
      // Remembering the previous quote is optional.
    }
  }, []);

  function changeQuote() {
    const next = randomQuote(index);
    setIndex(next);
    setIteration((value) => value + 1);
    try {
      sessionStorage.setItem(storageKey, String(next));
    } catch {
      // Keep the control usable in private or restricted browsers.
    }
  }

  const quote = openingQuotes[index ?? 0];
  const typingStyle = {
    "--typing-start": iteration === 0 ? "var(--intro-type)" : "120ms",
    "--typing-duration": `${quote.text.length * 22}ms`,
  } as CSSProperties;

  return (
    <section className="opening" aria-label="A thought to begin with" data-ready={index !== null}>
      <div className="opening-grid" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="opening-top micro">
        <span>
          <span className="status-dot" /> A thought to begin with
        </span>
        <span className="opening-edition">An ongoing pursuit of better</span>
      </div>
      <div className="opening-thought" key={`${index}-${iteration}`} style={typingStyle}>
        <span className="opening-quote-mark" aria-hidden="true">
          “
        </span>
        <figure>
          <blockquote className={quote.text.length < 65 ? "short-quote" : ""}>
            <span className="sr-only">{quote.text}</span>
            <span className="typed-quote" aria-hidden="true">
              {Array.from(quote.text.matchAll(/\S+\s*/g), (word) => (
                <span key={word.index}>
                  <span className="typed-word">
                    {Array.from(word[0].trimEnd(), (letter, position) => (
                      <span
                        className="typed-letter"
                        // biome-ignore lint/suspicious/noArrayIndexKey: Character positions are stable within a quote; changing quotes remounts the entire figure.
                        key={word.index + position}
                        style={{ "--letter-index": word.index + position } as CSSProperties}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  {word[0].endsWith(" ") ? " " : ""}
                </span>
              ))}
            </span>
          </blockquote>
          <figcaption>
            <a href={quote.source} target="_blank" rel="noopener noreferrer" title={quote.context}>
              {quote.author} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <span>{quote.idea}</span>
          </figcaption>
        </figure>
      </div>
      <div className="opening-bottom">
        <div className="opening-introduction">
          <h1>Product thinker. Design doer.</h1>
          <p>Insurance enthusiast.</p>
        </div>
        <a href="#index" className="explore-link">
          <span>
            Meet the person
            <br />
            behind the perspective
          </span>
          <span className="round-arrow">
            <ArrowDown size={22} aria-hidden="true" />
          </span>
        </a>
        <button
          type="button"
          className="quote-switch"
          onClick={changeQuote}
          aria-label="Show another opening quote"
        >
          <span className="quote-counter micro">0{(index ?? 0) + 1} / 06</span>
          <RotateCw size={16} aria-hidden="true" />
        </button>
      </div>
      <noscript>
        <style>
          {
            ".opening-thought, .typed-letter { opacity: 1 !important; } .typed-letter { animation: none; } .quote-switch { display: none; }"
          }
        </style>
      </noscript>
    </section>
  );
}
