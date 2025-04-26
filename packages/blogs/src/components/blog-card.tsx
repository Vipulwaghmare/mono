"use client";
import Link from "next/link";
import Image from "next/image";
interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  date,
  imageSrc,
}: BlogCardProps) {
  return (
    <div className="blog-card">
      <Link href={`/blogs/${id}`} className="block">
        <div className="relative">
          <Image
            className="blog-card-image"
            src={imageSrc}
            alt={title}
            width={400}
            height={200}
            priority={false}
            loading="lazy"
          />
        </div>
        <div className="blog-card-content">
          <h2 className="blog-card-title">{title}</h2>
          <p className="blog-card-excerpt">{excerpt}</p>
          <time dateTime={date} className="blog-card-date">
            {date}
          </time>
        </div>
      </Link>
    </div>
  );
}
