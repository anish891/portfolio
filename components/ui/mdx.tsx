import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { CopyButton } from "@/components/ui/CopyButton";

/** A heading with a "#" link to itself that appears on hover or focus. rehype-slug supplies the id. */
function heading(Tag: "h2" | "h3") {
  return function Heading({ id, children, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
      <Tag id={id} {...props}>
        {children}
        {id && (
          <a href={`#${id}`} className="anchor" aria-label="Link to this section">
            #
          </a>
        )}
      </Tag>
    );
  };
}

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ) : (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  h2: heading("h2"),
  h3: heading("h3"),
  // Code blocks scroll sideways on their own and get a copy button. tabIndex makes the
  // scrollable area reachable by keyboard.
  pre: (props) => (
    <div className="code-block">
      <pre tabIndex={0} {...props} />
      <CopyButton />
    </div>
  ),
  // Wide tables scroll inside their own box instead of widening the page.
  table: (props) => (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Table">
      <table {...props} />
    </div>
  ),
};
