import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash } from "lucide-react";
import { GetPersonalNotesResponseDto } from "@vipulwaghmare/apis";
import useGetAllData from "@/hooks/useGetAllData";
import {
  useDeletePersonalNote,
  useUpdatePersonalNote,
  useCreatePersonalNote,
} from "@/hooks/apis";

export default function PersonalEntryList({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const { data, isLoading } = useGetAllData(selectedDate);
  const entries = data?.personal ?? [];
  const [newEntry, setNewEntry] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });
  const createPersonalNote = useCreatePersonalNote();
  const updatePersonalNote = useUpdatePersonalNote();
  const deletePersonalNote = useDeletePersonalNote();
  const [editingEntry, setEditingEntry] =
    useState<GetPersonalNotesResponseDto | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddEntry = () => {
    if (newEntry.title.trim() === "" || newEntry.content.trim() === "") return;

    const entry = {
      id: Date.now(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toISOString().split("T")[0],
    };
    createPersonalNote.mutate(entry);
    setNewEntry({ title: "", content: "" });
    setIsAddDialogOpen(false);
  };

  const handleEditEntry = () => {
    if (
      !editingEntry ||
      editingEntry.title.trim() === "" ||
      editingEntry.content.trim() === ""
    )
      return;
    updatePersonalNote.mutate({
      id: editingEntry._id,
      title: editingEntry.title,
      content: editingEntry.content,
      date: selectedDate,
    });
    setEditingEntry(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteEntry = (id: string) => {
    deletePersonalNote.mutate({
      id,
      date: selectedDate,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Personal Diary</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Personal Entry</DialogTitle>
              <DialogDescription>
                Record your personal thoughts, experiences, and feelings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEntry.title}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, title: e.target.value })
                  }
                  placeholder="Enter a title for your entry"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Description</Label>
                <Textarea
                  id="content"
                  value={newEntry.content}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, content: e.target.value })
                  }
                  placeholder="Write your thoughts here..."
                  className="min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddEntry}>Save Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No entries yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Start documenting your personal experiences.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Entry
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <Card key={entry.title}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{entry.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isEditDialogOpen && editingEntry?._id === entry._id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (open) setEditingEntry(entry);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Personal Entry</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={editingEntry?.title || ""}
                              onChange={(e) =>
                                editingEntry &&
                                setEditingEntry({
                                  ...editingEntry,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-content">Description</Label>
                            <Textarea
                              id="edit-content"
                              value={editingEntry?.content || ""}
                              onChange={(e) =>
                                editingEntry &&
                                setEditingEntry({
                                  ...editingEntry,
                                  content: e.target.value,
                                })
                              }
                              className="min-h-[200px]"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleEditEntry}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEntry(entry._id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {data && formatDate(data.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-4">{entry.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
