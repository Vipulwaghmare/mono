import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const InsertLinkDialog = ({
  open,
  setOpen,
  insertLink,
  linkText,
  setLinkText,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  insertLink: (linkUrl: string) => void;
  linkText: string;
  setLinkText: (linkText: string) => void;
}) => {
  const [linkUrl, setLinkUrl] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="link-text">Link Text</Label>
            <Input
              id="link-text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Text to display"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => insertLink(linkUrl)}>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsertLinkDialog;
