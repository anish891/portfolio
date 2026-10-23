import { afterEach, describe, expect, it, vi } from "vitest";

async function loadConfig() {
  vi.resetModules();
  return (await import("@/next.config")).default;
}

async function headersFor(source = "/:path*") {
  const cfg = await loadConfig();
  const rules = await cfg.headers!();
  const rule = rules.find((r) => r.source === source);
  expect(rule, `a header rule for ${source}`).toBeDefined();
  return Object.fromEntries(rule!.headers.map((h) => [h.key, h.value]));
}

afterEach(() => vi.resetModules());

describe("security headers (production)", () => {
  it("applies to every route and sets the full set", async () => {
    const h = await headersFor();
    expect(Object.keys(h).sort()).toEqual(
      [
        "Content-Security-Policy",
        "Permissions-Policy",
        "Referrer-Policy",
        "Strict-Transport-Security",
        "X-Content-Type-Options",
        "X-Frame-Options",
      ].sort()
    );
    expect(h["X-Content-Type-Options"]).toBe("nosniff");
    expect(h["X-Frame-Options"]).toBe("DENY");
    expect(h["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["Strict-Transport-Security"]).toMatch(/max-age=\d+/);
  });

  it("has a Content-Security-Policy that blocks the dangerous things", async () => {
    const csp = (await headersFor())["Content-Security-Policy"];
    const directive = (name: string) => csp.split("; ").find((d) => d.startsWith(name + " "));
    expect(directive("default-src")).toBe("default-src 'self'");
    expect(directive("object-src")).toBe("object-src 'none'");
    expect(directive("base-uri")).toBe("base-uri 'self'");
    expect(directive("form-action")).toBe("form-action 'self'");
    expect(directive("frame-ancestors")).toBe("frame-ancestors 'none'");
  });

  it("allows the contact form's service and nothing else outside the site", async () => {
    const csp = (await headersFor())["Content-Security-Policy"];
    const connect = csp.split("; ").find((d) => d.startsWith("connect-src"))!;
    expect(connect).toBe("connect-src 'self' https://api.web3forms.com");
    const script = csp.split("; ").find((d) => d.startsWith("script-src"))!;
    expect(script).not.toContain("unsafe-eval");
    expect(script).not.toMatch(/https?:/);
  });

  it("hides the X-Powered-By header", async () => {
    expect((await loadConfig()).poweredByHeader).toBe(false);
  });
});

describe("security headers (development)", () => {
  it("additionally allows what hot reloading needs, and only in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const csp = (await headersFor())["Content-Security-Policy"];
    expect(csp).toContain("'unsafe-eval'");
    expect(csp).toContain("ws:");
  });
});
