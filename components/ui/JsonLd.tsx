import { serializeJsonLd } from "@/lib/jsonld";

/** Renders one or more JSON-LD objects as script tags, escaped so they cannot close the tag early. */
export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(d) }}
        />
      ))}
    </>
  );
}
