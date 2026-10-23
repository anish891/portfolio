import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "@/proxy";

const request = (pathname: string) => new NextRequest(`http://localhost:3000${pathname}`);

describe("proxy (malformed URL guard)", () => {
  it.each(["/blog/tag/%", "/blog/tag/%E0%A4%A", "/blog/%zz", "/projects/a%2", "/blog/x%C0%AF"])(
    "turns %s into a 404 rewrite",
    (path) => {
      const res = proxy(request(path));
      expect(res.status).toBe(404);
      expect(res.headers.get("x-middleware-rewrite")).toContain("/not-found-malformed-url");
    }
  );

  it.each(["/blog/tag/algorithms", "/blog/tea", "/projects/unbake", "/blog/tag/caf%C3%A9", "/blog/a%20b"])(
    "lets %s through untouched",
    (path) => {
      const res = proxy(request(path));
      expect(res.headers.get("x-middleware-next")).toBe("1");
      expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    }
  );

  it("only runs on the dynamic routes", () => {
    expect(config.matcher).toEqual(["/blog/:path*", "/projects/:path*"]);
  });
});
