import { cn } from "@/lib/utils";

/**
 * Adapted from Aceternity's pointer-highlight, rebuilt as pure CSS.
 *
 * The original measured the element with a ResizeObserver and animated to those
 * pixel values with `motion`. Animating `width`/`height` from 0 to 100% reaches
 * the same result with no measurement, no client JS and no animation library —
 * so this renders on the server. It also fixes two problems in the original: it
 * emitted a `div` (invalid inside a heading) and ignored reduced motion.
 *
 * See `.highlight-box` / `.highlight-pointer` in styles.css.
 */
export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}) {
  return (
    <span className={cn("relative inline-block", containerClassName)}>
      {children}
      <span
        aria-hidden
        className={cn(
          "highlight-box pointer-events-none absolute top-0 left-0 block h-full w-full border border-accent",
          rectangleClassName,
        )}
      />
      <span
        aria-hidden
        className="highlight-pointer pointer-events-none absolute top-0 left-0 block"
      >
        <Pointer className={cn("size-5 -rotate-90", pointerClassName)} />
      </span>
    </span>
  );
}

const Pointer = ({ className }: { className?: string }) => (
  <svg
    className={cn("text-accent", className)}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    aria-hidden="true"
  >
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
  </svg>
);
