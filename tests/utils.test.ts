import { describe, expect, it } from "vitest";
import { cn, safeDecodeURIComponent } from "@/lib/utils";

describe("safeDecodeURIComponent", () => {
  it("decodes valid escapes", () => {
    expect(safeDecodeURIComponent("algorithms")).toBe("algorithms");
    expect(safeDecodeURIComponent("caf%C3%A9")).toBe("café");
    expect(safeDecodeURIComponent("a%20b")).toBe("a b");
  });

  it.each(["%", "%zz", "a%2", "%E0%A4%A", "%C0%AF"])("returns null instead of throwing for %s", (bad) => {
    expect(() => decodeURIComponent(bad)).toThrow(); // the reason this helper exists
    expect(safeDecodeURIComponent(bad)).toBeNull();
  });
});

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
});
