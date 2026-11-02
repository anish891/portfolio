import { getAllPosts } from "@/lib/blog";
import { llmsTxt } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(getAllPosts()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
