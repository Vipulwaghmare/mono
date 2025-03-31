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

const InsertImageDialog = ({
  open,
  setOpen,
  insertImage,
  imageAlt,
  setImageAlt,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  insertImage: (imageUrl: string) => void;
  imageAlt: string;
  setImageAlt: (imageAlt: string) => void;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image-alt">Alt Text</Label>
            <Input
              id="image-alt"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder="Image description"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => insertImage(imageUrl)}>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsertImageDialog;
