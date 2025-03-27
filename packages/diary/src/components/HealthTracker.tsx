import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusCircle,
  Edit,
  Trash,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import useGetAllData from "@/hooks/useGetAllData";

// Sample data for demonstration
const sampleEntries = [
  {
    id: 1,
    date: "2023-06-15",
    weight: 75.5,
    height: 180,
    calories: 2100,
    diet: "Had a balanced diet with plenty of protein and vegetables. Avoided processed foods.",
    notes: "Feeling energetic today. Slept well last night.",
  },
  {
    id: 2,
    date: "2023-06-10",
    weight: 76.2,
    height: 180,
    calories: 2300,
    diet: "Had a cheat meal for dinner. Otherwise, stuck to my meal plan.",
    notes: "Feeling a bit tired. Need to improve sleep quality.",
  },
  {
    id: 3,
    date: "2023-06-05",
    weight: 76.8,
    height: 180,
    calories: 2200,
    diet: "Followed my meal plan strictly. Had a protein shake after workout.",
    notes: "Feeling good. Noticed some improvement in energy levels.",
  },
];

export default function HealthTracker({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const { data } = useGetAllData(selectedDate);
  const health = data?.health ?? [];
  const [entries, setEntries] = useState(sampleEntries);
  const [newEntry, setNewEntry] = useState({
    weight: "",
    height: "",
    calories: "",
    diet: "",
    notes: "",
  });
  const [editingEntry, setEditingEntry] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // const [filteredEntries, setFilteredEntries] = useState([]);

  // useEffect(() => {
  //   if (selectedDate) {
  //     setFilteredEntries(
  //       entries.filter((entry) => entry.date === selectedDate),
  //     );
  //   } else {
  //     setFilteredEntries(entries);
  //   }
  // }, [entries, selectedDate]);

  const handleAddEntry = () => {
    if (!newEntry.weight || !newEntry.height) return;

    const entry = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      weight: Number.parseFloat(newEntry.weight),
      height: Number.parseFloat(newEntry.height),
      calories: newEntry.calories ? Number.parseInt(newEntry.calories) : 0,
      diet: newEntry.diet,
      notes: newEntry.notes,
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      weight: "",
      height: "",
      calories: "",
      diet: "",
      notes: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditEntry = () => {
    // if (!editingEntry || !editingEntry.weight || !editingEntry.height) return;
    // setEntries(
    //   entries.map((entry) =>
    //     entry.id === editingEntry.id
    //       ? {
    //           ...editingEntry,
    //           weight: Number.parseFloat(editingEntry.weight),
    //           height: Number.parseFloat(editingEntry.height),
    //           calories: editingEntry.calories
    //             ? Number.parseInt(editingEntry.calories)
    //             : 0,
    //         }
    //       : entry,
    //   ),
    // );
    // setEditingEntry(null);
    // setIsEditDialogOpen(false);
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getWeightTrend = (index) => {
    if (index >= filteredEntries.length - 1) return null;
    const currentWeight = filteredEntries[index].weight;
    const previousWeight = filteredEntries[index + 1].weight;

    if (currentWeight < previousWeight) {
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    } else if (currentWeight > previousWeight) {
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Health Tracker</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Health Entry</DialogTitle>
              <DialogDescription>
                Track your weight, height, diet, and calorie intake.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newEntry.weight}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, weight: e.target.value })
                    }
                    placeholder="75.5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={newEntry.height}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, height: e.target.value })
                    }
                    placeholder="180"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="calories">Calories Consumed</Label>
                <Input
                  id="calories"
                  type="number"
                  value={newEntry.calories}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, calories: e.target.value })
                  }
                  placeholder="2000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="diet">Diet Details</Label>
                <Textarea
                  id="diet"
                  value={newEntry.diet}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, diet: e.target.value })
                  }
                  placeholder="Describe what you ate today..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={newEntry.notes}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, notes: e.target.value })
                  }
                  placeholder="How are you feeling? Any other health observations?"
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

      {health.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No entries yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Start tracking your health metrics.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {health.map((entry, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center">
                    Health Log - {formatDate(entry.date)}
                    {getWeightTrend(index)}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isEditDialogOpen && editingEntry?.id === entry.id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (open) setEditingEntry({ ...entry });
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Health Entry</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-weight">Weight (kg)</Label>
                              <Input
                                id="edit-weight"
                                type="number"
                                step="0.1"
                                value={editingEntry?.weight || ""}
                                onChange={(e) =>
                                  setEditingEntry({
                                    ...editingEntry,
                                    weight: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-height">Height (cm)</Label>
                              <Input
                                id="edit-height"
                                type="number"
                                value={editingEntry?.height || ""}
                                onChange={(e) =>
                                  setEditingEntry({
                                    ...editingEntry,
                                    height: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-calories">
                              Calories Consumed
                            </Label>
                            <Input
                              id="edit-calories"
                              type="number"
                              value={editingEntry?.calories || ""}
                              onChange={(e) =>
                                setEditingEntry({
                                  ...editingEntry,
                                  calories: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-diet">Diet Details</Label>
                            <Textarea
                              id="edit-diet"
                              value={editingEntry?.diet || ""}
                              onChange={(e) =>
                                setEditingEntry({
                                  ...editingEntry,
                                  diet: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-notes">Additional Notes</Label>
                            <Textarea
                              id="edit-notes"
                              value={editingEntry?.notes || ""}
                              onChange={(e) =>
                                setEditingEntry({
                                  ...editingEntry,
                                  notes: e.target.value,
                                })
                              }
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
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Weight
                    </p>
                    <p className="text-lg font-semibold">{entry.weight} kg</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Height
                    </p>
                    <p className="text-lg font-semibold">{entry.height} cm</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      BMI
                    </p>
                    <p className="text-lg font-semibold">
                      {(entry.weight / Math.pow(entry.height / 100, 2)).toFixed(
                        1,
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Calories
                    </p>
                    <p className="text-lg font-semibold">{entry.calories}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Diet</h4>
                    <p className="text-sm text-muted-foreground">
                      {entry.diet}
                    </p>
                  </div>
                  {entry.notes && (
                    <div>
                      <h4 className="font-medium mb-1">Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        {entry.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
