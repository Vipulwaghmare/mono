import BlogCard from "@/components/blog-card";

const PLACEHOLDER_IMAGE_URL =
  "https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg";

export default function Home() {
  return (
    <main className="main">
      <div className="container">
        <h1>Latest Blog Posts</h1>
        <div className="blog-list">
          <BlogCard
            id="javascript-best-practices"
            title="JavaScript Best Practices"
            excerpt="Discover the latest best practices for writing clean, efficient JavaScript code"
            date="2024-04-25"
            imageSrc={PLACEHOLDER_IMAGE_URL}
          />

          <BlogCard
            id="react-hooks-deep-drive"
            title="React Hooks: A Deep Dive"
            excerpt="Everything you need to know about React Hooks and how to use them effectively"
            date="2024-04-20"
            imageSrc={PLACEHOLDER_IMAGE_URL}
          />

          <BlogCard
            id="css-grid-tutorial"
            title="CSS Grid Tutorial"
            excerpt="Learn how to create complex layouts with CSS Grid in this comprehensive tutorial"
            date="2024-04-15"
            imageSrc={PLACEHOLDER_IMAGE_URL}
          />
        </div>
      </div>
    </main>
  );
}
