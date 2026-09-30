import { describe, expect, it } from "vitest";
import { openingQuotes, pickQuoteIndex } from "./content/opening-quotes";

describe("opening quote selection", () => {
  it("offers six attributed and sourced opening thoughts", () => {
    expect(openingQuotes).toHaveLength(6);
    expect(new Set(openingQuotes.map((quote) => quote.author)).size).toBe(6);
    for (const quote of openingQuotes) {
      expect(new URL(quote.source).protocol).toBe("https:");
    }
  });

  it("can select every quote on a first visit", () => {
    const chosen = Array.from({ length: 6 }, (_, index) => pickQuoteIndex((index + 0.5) / 6));
    expect(chosen).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("makes every other quote available without repeating the last one", () => {
    for (let previous = 0; previous < 6; previous++) {
      const chosen = Array.from({ length: 5 }, (_, index) =>
        pickQuoteIndex((index + 0.5) / 5, previous),
      );
      expect(chosen).not.toContain(previous);
      expect(new Set(chosen).size).toBe(5);
      expect(chosen.every((index) => index >= 0 && index < 6)).toBe(true);
    }
  });

  it("handles invalid stored indices and random bounds", () => {
    for (const previous of [-1, 6, 1.5, Number.NaN]) {
      expect(pickQuoteIndex(0, previous)).toBe(0);
      expect(pickQuoteIndex(1, previous)).toBe(5);
    }
  });
});
