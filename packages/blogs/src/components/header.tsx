import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          VW Blogs
        </Link>
        <nav className="nav-links">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
