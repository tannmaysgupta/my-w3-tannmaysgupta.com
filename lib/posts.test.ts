import { describe, expect, it } from "vitest";
import { projects } from "./content/projects";
import { formatPostDate, slugFromFilename, sortPosts } from "./posts";

describe("slugFromFilename", () => {
  it("strips the extension", () => {
    expect(slugFromFilename("design-systems.mdx")).toBe("design-systems");
    expect(slugFromFilename("notes.md")).toBe("notes");
  });

  it("leaves dots inside the name alone", () => {
    expect(slugFromFilename("v1.2-notes.mdx")).toBe("v1.2-notes");
  });
});

describe("sortPosts", () => {
  it("puts the newest post first", () => {
    const sorted = sortPosts([
      { slug: "old", date: "2024-01-01" },
      { slug: "new", date: "2026-05-01" },
      { slug: "mid", date: "2025-03-01" },
    ]);
    expect(sorted.map((p) => p.slug)).toEqual(["new", "mid", "old"]);
  });

  it("breaks ties by slug so build output is stable", () => {
    const sorted = sortPosts([
      { slug: "beta", date: "2026-01-01" },
      { slug: "alpha", date: "2026-01-01" },
    ]);
    expect(sorted.map((p) => p.slug)).toEqual(["alpha", "beta"]);
  });

  it("does not mutate its input", () => {
    const input = [
      { slug: "a", date: "2024-01-01" },
      { slug: "b", date: "2026-01-01" },
    ];
    sortPosts(input);
    expect(input.map((p) => p.slug)).toEqual(["a", "b"]);
  });
});

describe("formatPostDate", () => {
  it("formats in UTC so the date never shifts by timezone", () => {
    expect(formatPostDate("2026-05-01")).toBe("1 May 2026");
    expect(formatPostDate("2026-01-31")).toBe("31 January 2026");
  });
});

describe("projects data", () => {
  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ships the nine curated tiles", () => {
    expect(projects).toHaveLength(9);
  });

  it("only points at absolute external URLs", () => {
    for (const project of projects) {
      if (!project.href) continue;
      expect(project.href).toMatch(/^https:\/\//);
    }
  });

  it("reserves the Vaatun accent for Vaatun surfaces", () => {
    for (const project of projects) {
      if (project.accent !== "vaatun") continue;
      expect(project.eyebrow).toContain("Vaatun");
    }
  });
});
