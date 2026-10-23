import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/ui/mdx";

export function PostBody({ source }: { source: string }) {
  return (
    <div className="prose-minimal">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: { light: "github-light-high-contrast", dark: "github-dark-high-contrast" },
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
