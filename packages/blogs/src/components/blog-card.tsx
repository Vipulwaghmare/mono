import Link from "next/link";

export const TAGS = [
  "Javascript",
  "React",
  "Basic",
  "Intermediate",
  "Deployment",
  // "Advanced",
  "Interview",
] as const;

export type TTags = (typeof TAGS)[number];

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  tags: TTags[];
  isDraft?: boolean;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  tags = [],
}: BlogCardProps) {
  return (
    <div className="blog-card">
      <Link href={`/blogs/${id}`} className="block">
        <div className="blog-card-content">
          <h2 className="blog-card-title">{title}</h2>
          <p className="blog-card-excerpt">{excerpt}</p>
          {tags.length > 0 && (
            <div className="blog-card-tags">
              {tags.map((tag) => (
                <span key={tag} className="blog-card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
