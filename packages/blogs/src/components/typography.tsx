export const Bold = ({ children }: { children: React.ReactNode }) => {
  return <span className="bold">{children}</span>;
};

export const BlogTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="blog-title">{children}</h1>;
};

export const ImportantNote = ({ children }: { children: React.ReactNode }) => {
  return (
    <p>
      <span className="important-text">Important:</span> {children}
    </p>
  );
};

export const Header = ({ title, meta }: { title: string; meta?: string }) => {
  return (
    <header className="blog-header">
      <BlogTitle>{title}</BlogTitle>
      {meta && <div className="blog-meta">{meta}</div>}
    </header>
  );
};

export const MainWrapper = ({
  children,
  title,
  meta,
}: {
  children: React.ReactNode;
  title: string;
  meta?: string;
}) => {
  return (
    <div>
      <main className="main">
        <article className="blog-content">
          <Header title={title} meta={meta} />
          {children}
        </article>
      </main>
    </div>
  );
};
