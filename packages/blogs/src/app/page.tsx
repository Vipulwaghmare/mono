"use client";

import { useState } from "react";
import BlogCard, { BlogCardProps, TTags } from "@/components/blog-card";

// Blog data array with tags
const blogs: BlogCardProps[] = [
  {
    id: "var-let-const",
    title: "Var, Let & Const",
    excerpt: "Everything you need to know about Var, Let & Const",
    tags: ["Javascript"],
  },
  // {
  //   id: "inheritance",
  //   title: "Inheritance",
  //   excerpt: "Everything you need to know about Inheritance",
  //   tags: ["Javascript"],
  // },
  // {
  //   id: "this-keyword",
  //   title: "This Keyword",
  //   excerpt: "Everything you need to know about this keyword",
  //   tags: ["Javascript"],
  // },
  // {
  //   id: "event-loop",
  //   title: "Event loop",
  //   excerpt: "Everything you need to know about event loop",
  //   tags: ["Javascript"],
  // },
];

// Extract unique tags from all blogs
const getAllTags = (): TTags[] => {
  const uniqueTags = new Set<TTags>();
  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => uniqueTags.add(tag));
  });
  return Array.from(uniqueTags);
};

export default function Home() {
  const [activeTag, setActiveTag] = useState<TTags | null>(null);
  const allTags = getAllTags();

  // Filter blogs based on active tag
  const filteredBlogs = activeTag
    ? blogs.filter((blog) => blog.tags.includes(activeTag))
    : blogs;

  return (
    <div>
      <main className="main">
        <div className="container">
          <div className="page-header">
            <h1>Latest Blog Posts</h1>
          </div>

          <div className="tag-filters">
            <button
              className={`tag-filter ${activeTag === null ? "active" : ""}`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-filter ${activeTag === tag ? "active" : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="blog-list">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                tags={blog.tags}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
