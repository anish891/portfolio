import { describe, expect, it } from "vitest";
import { safeDecodeURIComponent } from "@/lib/utils";

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
