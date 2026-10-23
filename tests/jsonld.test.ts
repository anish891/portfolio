import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/jsonld";

const BACKSLASH = String.fromCharCode(92);
const LINE_SEP = String.fromCharCode(0x2028);
const PARA_SEP = String.fromCharCode(0x2029);

describe("serializeJsonLd", () => {
  it("never emits a raw less-than sign, so </script> cannot end the tag", () => {
    const out = serializeJsonLd({ headline: "Probe </script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(out).toContain(BACKSLASH + "u003c/script>");
  });

  it("stays valid JSON that parses back to the original data", () => {
    const data = {
      "@context": "https://schema.org",
      name: "Anish & <Co>",
      nested: { list: ["a", "<b>", "c"], n: 3, ok: true, nothing: null },
    };
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it("escapes the line and paragraph separators", () => {
    const out = serializeJsonLd({ text: "a" + LINE_SEP + "b" + PARA_SEP + "c" });
    expect(out).not.toContain(LINE_SEP);
    expect(out).not.toContain(PARA_SEP);
    expect(out).toContain(BACKSLASH + "u2028");
    expect(out).toContain(BACKSLASH + "u2029");
  });

  it("leaves ordinary text unchanged", () => {
    expect(serializeJsonLd({ a: "plain text" })).toBe('{"a":"plain text"}');
  });
});
