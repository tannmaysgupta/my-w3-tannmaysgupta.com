/** Short excerpts, checked against the linked speech, essay, or interview. */
export const openingQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    context: "Stanford commencement, 2005",
    source: "https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says",
    idea: "Care deeply.",
  },
  {
    text: "Nothing has served me better in my long life than continuous learning.",
    author: "Charlie Munger",
    context: "USC Law commencement, 2007",
    source:
      "https://jamesclear.com/great-speeches/2007-usc-law-school-commencement-address-by-charlie-munger",
    idea: "Stay a student.",
  },
  {
    text: "Become the best in the world at what you do. Keep redefining what you do until this is true.",
    author: "Naval Ravikant",
    context: "Keep Redefining What You Do, 2019",
    source: "https://nav.al/redefining",
    idea: "Keep becoming.",
  },
  {
    text: "Sweat Equity is the best start up capital.",
    author: "Mark Cuban",
    context: "The Best Equity is Sweat Equity, 2008",
    source: "https://blogmaverick.com/2008/01/02/the-best-equity-is-sweat-equity/",
    idea: "Do the work.",
  },
  {
    text: "Good design is as little design as possible.",
    author: "Dieter Rams",
    context: "Ten principles for good design",
    source: "https://www.vitsoe.com/us/about/good-design",
    idea: "Make room for clarity.",
  },
  {
    text: "Make something people want.",
    author: "Paul Graham",
    context: "Be Good, 2008",
    source: "https://www.paulgraham.com/good.html",
    idea: "Start with people.",
  },
] as const;

/** Uniformly choose a quote, excluding the previous one when it is known. */
export function pickQuoteIndex(random: number, previous: number | null = null): number {
  const count = openingQuotes.length;
  const validPrevious =
    previous !== null && Number.isInteger(previous) && previous >= 0 && previous < count;
  const slot = Math.floor(
    Math.min(Math.max(random, 0), 1 - Number.EPSILON) * (count - (validPrevious ? 1 : 0)),
  );
  return validPrevious && slot >= previous ? slot + 1 : slot;
}
