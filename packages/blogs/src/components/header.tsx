import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          DevBlog
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
