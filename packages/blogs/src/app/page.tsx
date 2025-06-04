"use client";

import { useState } from "react";
import BlogCard, { BlogCardProps, TAGS, TTags } from "@/components/blog-card";

// Blog data array with tags
const blogs: BlogCardProps[] = [
  {
    id: "execution-context",
    title: "Execution context in JS",
    excerpt: "Global and Functional execution context of JS.",
    tags: ["Javascript", "Basic"],
  },
  {
    id: "var-let-const",
    title: "Var, Let & Const",
    excerpt: "Everything you need to know about Var, Let & Const.",
    tags: ["Javascript", "Basic"],
  },
  // {
  //   id: "event-loop",
  //   title: "Event loop",
  //   excerpt: "Everything you need to know about event loop",
  //   tags: ["Javascript", "Basic"],
  // },
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
  //   tags: ["Javascript", "Basic"],
  // },
  {
    id: "react-with-webpack",
    title: "React with webpack",
    excerpt: "Start a react app with webpack from scratch.",
    tags: ["React", "Intermediate"],
  },
];

export default function Home() {
  const [activeTag, setActiveTag] = useState<TTags | null>(null);

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
            {TAGS.map((tag) => (
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
