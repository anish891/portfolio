/**
 * Serialises a JSON-LD object for use inside a <script type="application/ld+json"> tag.
 *
 * Plain JSON.stringify does not escape "<", so a value containing "</script>" would end the
 * tag early and let the text after it run as HTML. Replacing "<" with its unicode escape keeps
 * the output valid JSON while making that impossible (as the Next.js JSON-LD guide recommends).
 * The line and paragraph separators are escaped too, because they are not valid in older
 * JavaScript string literals.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
