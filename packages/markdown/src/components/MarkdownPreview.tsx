function markdownToHtml(markdown: string): string {
  let html = markdown
    // Horizontal rule
    .replace(/^---$/gm, "<hr style='border-width: 2px;'>")
    // Headers
    .replace(
      /^# (.*$)/gm,
      "<h1 style='font-size: revert; font-weight: revert;'>$1</h1>",
    )
    .replace(
      /^## (.*$)/gm,
      "<h2 style='font-size: revert; font-weight: revert;'>$1</h2>",
    )
    .replace(
      /^### (.*$)/gm,
      "<h3 style='font-size: revert; font-weight: revert;'>$1</h3>",
    )
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/gm, "<strong>$1</strong>")
    .replace(/_(.*?)_/gm, "<em>$1</em>")
    // Lists
    .replace(
      /^-\s+(.*$)/gm,
      "<ul style='    list-style: disc;'><li>$1</li></ul>",
    )
    .replace(/^[0-9]+\.\s+(.*$)/gm, "<ol><li>$1</li></ol>")
    // Blockquotes
    .replace(
      /^>\s+(.*$)/gm,
      "<blockquote style='background: lightgrey'>$1</blockquote>",
    )
    // Code blocks
    .replace(
      /```([\s\S]*?)```/gm,
      "<pre  style='background: lightgrey><code>$1</code></pre>",
    )
    // Images
    .replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" />')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gm, '<a style="color:blue;" href="$2">$1</a>')
    // Paragraphs
    .replace(
      /^(?!<(h[1-3]|ul|ol|blockquote|pre|hr|a|img|p)>)(.*\S.*)$/gm,
      "<p>$2</p>",
    );

  // Fix nested lists
  html = html.replace(/<\/ul>\s*<ul>/g, "").replace(/<\/ol>\s*<ol>/g, "");

  return html;
}

function MarkdownPreview({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: markdownToHtml(content),
      }}
    />
  );
}

export default MarkdownPreview;
