"use client";
import Link from "next/link";
// import Image from "next/image";

export type TTags = "Javascript" | "React";

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: TTags[];
}

export default function BlogCard({
  id,
  title,
  excerpt,
  date,
  tags = [],
}: BlogCardProps) {
  return (
    <div className="blog-card">
      <Link href={`/blogs/${id}`} className="block">
        <div className="blog-card-content">
          <h2 className="blog-card-title">{title}</h2>
          <p className="blog-card-excerpt">{excerpt}</p>
          <time dateTime={date} className="blog-card-date">
            {date}
          </time>{" "}
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
