import { describe, expect, it } from "vitest";
import { experience } from "./content/experience";
import {
  formatDuration,
  formatMonth,
  formatRange,
  monthsBetween,
  parseMonth,
  startSortValue,
} from "./dates";

describe("parseMonth", () => {
  it("parses a well-formed month", () => {
    expect(parseMonth("2025-03")).toEqual({ year: 2025, month: 3 });
  });

  it("rejects malformed input rather than guessing", () => {
    expect(() => parseMonth("2025-3")).toThrow();
    expect(() => parseMonth("March 2025")).toThrow();
    expect(() => parseMonth("2025-13")).toThrow();
  });
});

describe("formatMonth", () => {
  it("formats both ends of the year correctly", () => {
    expect(formatMonth("2025-01")).toBe("Jan 2025");
    expect(formatMonth("2025-12")).toBe("Dec 2025");
  });
});

describe("formatRange", () => {
  it("renders an open-ended range as Present", () => {
    expect(formatRange("2025-03", null)).toBe("Mar 2025 – Present");
  });

  it("renders a closed range", () => {
    expect(formatRange("2022-04", "2024-03")).toBe("Apr 2022 – Mar 2024");
  });
});

describe("monthsBetween", () => {
  it("counts inclusively, matching how tenure is normally stated", () => {
    // Apr 2022 – Mar 2024 reads as 2 years.
    expect(monthsBetween("2022-04", "2024-03")).toBe(24);
    expect(monthsBetween("2018-06", "2018-07")).toBe(2);
  });
});

describe("formatDuration", () => {
  it("matches the shape LinkedIn uses", () => {
    expect(formatDuration(18)).toBe("1 yr 6 mos");
    expect(formatDuration(24)).toBe("2 yrs");
    expect(formatDuration(1)).toBe("1 mo");
    expect(formatDuration(13)).toBe("1 yr 1 mo");
  });

  it("returns nothing for a non-positive span", () => {
    expect(formatDuration(0)).toBe("");
  });
});

describe("experience data", () => {
  it("has exactly one current role", () => {
    const current = experience.flatMap((e) => e.roles).filter((r) => r.end === null);
    expect(current).toHaveLength(1);
    expect(current[0].title).toBe("Co-Founder & CEO");
  });

  it("uses parseable dates throughout", () => {
    for (const org of experience) {
      for (const role of org.roles) {
        expect(() => parseMonth(role.start)).not.toThrow();
        const end = role.end;
        if (end) expect(() => parseMonth(end)).not.toThrow();
      }
    }
  });

  it("never ends a role before it starts", () => {
    for (const org of experience) {
      for (const role of org.roles) {
        if (!role.end) continue;
        expect(startSortValue(role.end)).toBeGreaterThanOrEqual(startSortValue(role.start));
      }
    }
  });

  it("lists organisations newest first", () => {
    const starts = experience.map((org) =>
      Math.max(...org.roles.map((role) => startSortValue(role.start))),
    );
    expect(starts).toEqual([...starts].sort((a, b) => b - a));
  });

  it("lists roles within an organisation newest first", () => {
    for (const org of experience) {
      const starts = org.roles.map((role) => startSortValue(role.start));
      expect(starts).toEqual([...starts].sort((a, b) => b - a));
    }
  });

  it("omits the part-time PrishaPolicy consultancy", () => {
    const prisha = experience.find((e) => e.org === "PrishaPolicy");
    expect(prisha?.roles.map((r) => r.title)).toEqual([
      "Head of Product & Strategy",
      "Product Manager",
    ]);
  });
});
