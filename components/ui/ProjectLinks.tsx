import Link from "next/link";
import type { Project } from "@/lib/data";
import type { PostMeta } from "@/lib/blog";

/** Inline Case study / Live / Source links for a project. */
export function ProjectLinks({
  project,
  caseStudy = false,
}: {
  project: Project;
  caseStudy?: boolean;
}) {
  return (
    <ul className="ui dots flex flex-wrap">
      {caseStudy && (
        <li>
          <Link href={`/projects/${project.id}`} className="inline-block py-1">
            Case study
          </Link>
        </li>
      )}
      {project.deployedUrl && (
        <li>
          <a href={project.deployedUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-1">
            Live
          </a>
        </li>
      )}
      {project.githubUrl && (
        <li>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-1">
            Source
          </a>
        </li>
      )}
    </ul>
  );
}

/** The posts written about a project, linked by title. Renders nothing when there are none. */
export function ProjectWriteUps({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <p className="ui">
      <span className="muted">{posts.length === 1 ? "Write-up" : "Write-ups"}:</span>{" "}
      {posts.map((post, i) => (
        <span key={post.slug}>
          {i > 0 && <span className="muted"> · </span>}
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </span>
      ))}
    </p>
  );
}
