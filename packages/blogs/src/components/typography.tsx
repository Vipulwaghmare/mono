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
