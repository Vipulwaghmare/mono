import type React from "react";
import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Link,
  ImageIcon,
  Eye,
  EyeOff,
  Download,
  Copy,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MarkdownPreview from "@/components/MarkdownPreview";
import InsertImageDialog from "@/components/InsertImage";
import InsertLinkDialog from "@/components/InsertLink";

export default function MarkdownEditor() {
  // const { toast } = useToast();
  const [content, setContent] = useState(
    "# My Markdown Document\n\nStart typing here to create your document...\n\n",
  );
  const [showPreview, setShowPreview] = useState(true);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  // Add history management
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Update content with history management
  const updateContent = (newContent: string) => {
    // Remove any future history entries if we're not at the end
    if (currentIndex < history.length - 1) {
      setHistory(history.slice(0, currentIndex + 1));
    }

    // Add new content to history
    setHistory([...history, newContent]);
    setCurrentIndex(currentIndex + 1);
    setContent(newContent);
  };

  // Undo function
  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setContent(history[currentIndex - 1]);
    }
  };

  // Redo function
  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setContent(history[currentIndex + 1]);
    }
  };

  // Track selection position in the editor
  const handleSelectionChange = () => {
    if (editorRef.current) {
      setSelectionStart(editorRef.current.selectionStart);
      setSelectionEnd(editorRef.current.selectionEnd);
    }
  };

  // Insert text at cursor position or replace selected text
  const insertText = (before: string, after = "") => {
    if (!editorRef.current) return;

    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = textarea.value.substring(startPos, endPos);

    // Check if the selected text already has markdown formatting
    let cleanText = selectedText;

    // Remove bold formatting
    if (cleanText.startsWith("**") && cleanText.endsWith("**")) {
      cleanText = cleanText.substring(2, cleanText.length - 2);
    }
    // Remove italic formatting
    else if (cleanText.startsWith("_") && cleanText.endsWith("_")) {
      cleanText = cleanText.substring(1, cleanText.length - 1);
    }
    // Remove heading formatting
    else if (cleanText.startsWith("# ")) {
      cleanText = cleanText.substring(2);
    } else if (cleanText.startsWith("## ")) {
      cleanText = cleanText.substring(3);
    } else if (cleanText.startsWith("### ")) {
      cleanText = cleanText.substring(4);
    }

    const newText = before + cleanText + after;
    const newContent =
      textarea.value.substring(0, startPos) +
      newText +
      textarea.value.substring(endPos);

    updateContent(newContent);

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        startPos + before.length,
        startPos + before.length + cleanText.length,
      );
    }, 0);
  };

  // Insert a new line with text if needed
  const insertLine = (text: string) => {
    if (!editorRef.current) return;

    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const currentLine =
      textarea.value.substring(0, startPos).split("\n").pop() || "";

    // Check if we need to insert a new line before our text
    const prefix = currentLine.trim().length > 0 ? "\n" : "";

    insertText(prefix + text + "", "\n");
  };

  // Format handlers
  const handleBold = () => insertText("**", "**");
  const handleItalic = () => insertText("_", "_");
  const handleHeading1 = () => insertLine("# ");
  const handleHeading2 = () => insertLine("## ");
  const handleHeading3 = () => insertLine("### ");
  const handleBulletList = () => insertLine("- ");
  const handleNumberedList = () => insertLine("1. ");
  const handleBlockquote = () => insertLine("> ");
  const handleCodeBlock = () => insertText("```\n", "\n```");
  const handleHorizontalRule = () => insertLine("---");

  // Handle link dialog
  const openLinkDialog = () => {
    if (editorRef.current) {
      const selectedText = editorRef.current.value.substring(
        editorRef.current.selectionStart,
        editorRef.current.selectionEnd,
      );
      setLinkText(selectedText);
      setLinkDialogOpen(true);
    }
  };

  const insertLink = (linkUrl: string) => {
    const markdown = `[${linkText}](${linkUrl})`;

    if (editorRef.current) {
      const textarea = editorRef.current;
      const newContent =
        textarea.value.substring(0, selectionStart) +
        markdown +
        textarea.value.substring(selectionEnd);

      updateContent(newContent);
    }

    setLinkDialogOpen(false);
    setLinkText("");
  };

  // Handle image dialog
  const openImageDialog = () => {
    if (editorRef.current) {
      const selectedText = editorRef.current.value.substring(
        editorRef.current.selectionStart,
        editorRef.current.selectionEnd,
      );
      setImageAlt(selectedText);
      setImageDialogOpen(true);
    }
  };

  const insertImage = (imageUrl: string) => {
    const markdown = `![${imageAlt}](${imageUrl})`;

    if (editorRef.current) {
      const textarea = editorRef.current;
      const newContent =
        textarea.value.substring(0, selectionStart) +
        markdown +
        textarea.value.substring(selectionEnd);

      updateContent(newContent);
    }

    setImageDialogOpen(false);
    setImageAlt("");
  };

  // Copy markdown to clipboard
  const copyMarkdown = () => {
    navigator.clipboard.writeText(content);
    // toast({
    //   title: "Copied to clipboard",
    //   description: "Markdown content has been copied to your clipboard",
    // });
  };

  // Download markdown file
  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Modify handleKeyDown to include undo/redo shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Undo: Ctrl+Z
    if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }
    // Redo: Ctrl+Y or Ctrl+Shift+Z
    else if (
      (e.ctrlKey && e.key === "y") ||
      (e.ctrlKey && e.shiftKey && e.key === "z")
    ) {
      e.preventDefault();
      handleRedo();
    }
    // Bold: Ctrl+B
    else if (e.ctrlKey && e.key === "b") {
      e.preventDefault();
      handleBold();
    }
    // Italic: Ctrl+I
    else if (e.ctrlKey && e.key === "i") {
      e.preventDefault();
      handleItalic();
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-center">Markdown Editor</h1>

        {/* Toolbar */}
        <div className="bg-card border rounded-lg p-2 flex flex-wrap gap-1 sticky top-0 z-10">
          <TooltipProvider>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleUndo}
                    disabled={currentIndex <= 0}
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRedo}
                    disabled={currentIndex >= history.length - 1}
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleBold}>
                    <Bold className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleItalic}>
                    <Italic className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleHeading1}>
                    <Heading1 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 1</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleHeading2}>
                    <Heading2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 2</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleHeading3}>
                    <Heading3 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 3</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBulletList}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bullet List</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNumberedList}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Numbered List</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBlockquote}
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Blockquote</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleCodeBlock}>
                    <Code className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Code Block</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleHorizontalRule}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Horizontal Rule</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={openLinkDialog}>
                    <Link className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Link</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={openImageDialog}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Image</TooltipContent>
              </Tooltip>
            </div>

            <div className="ml-auto flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={copyMarkdown}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Markdown</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={downloadMarkdown}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download Markdown</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showPreview ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <div
          className={`grid gap-6 ${showPreview ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
        >
          <div className="min-h-[500px] border rounded-lg overflow-hidden">
            <textarea
              ref={editorRef}
              value={content}
              onChange={(e) => updateContent(e.target.value)}
              onSelect={handleSelectionChange}
              onKeyDown={handleKeyDown}
              className="w-full h-full min-h-[500px] p-4 font-mono text-sm resize-none focus:outline-none bg-background"
              spellCheck="false"
            />
          </div>

          {showPreview && (
            <div className="border rounded-lg p-4 min-h-[500px] prose dark:prose-invert max-w-none overflow-auto">
              <MarkdownPreview content={content} />
            </div>
          )}
        </div>
      </div>
      <InsertLinkDialog
        open={linkDialogOpen}
        setOpen={setLinkDialogOpen}
        insertLink={insertLink}
        linkText={linkText}
        setLinkText={setLinkText}
      />
      <InsertImageDialog
        open={imageDialogOpen}
        setOpen={setImageDialogOpen}
        insertImage={insertImage}
        imageAlt={imageAlt}
        setImageAlt={setImageAlt}
      />
    </div>
  );
}
