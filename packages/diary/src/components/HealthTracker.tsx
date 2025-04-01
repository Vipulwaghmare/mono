import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import {
  PlusCircle,
  // Edit,
  Trash,
  // TrendingUp,
  // TrendingDown,
} from "lucide-react";
import useGetAllData from "@/hooks/useGetAllData";
// import { GetHealthLogResponseDto } from "@vipulwaghmare/apis";
import AddHealthLog from "./forms/AddHealthLog";

// Sample data for demonstration
// const sampleEntries = [
//   {
//     id: 1,
//     date: "2023-06-15",
//     weight: 75.5,
//     height: 180,
//     calories: 2100,
//     diet: "Had a balanced diet with plenty of protein and vegetables. Avoided processed foods.",
//     notes: "Feeling energetic today. Slept well last night.",
//   },
//   {
//     id: 2,
//     date: "2023-06-10",
//     weight: 76.2,
//     height: 180,
//     calories: 2300,
//     diet: "Had a cheat meal for dinner. Otherwise, stuck to my meal plan.",
//     notes: "Feeling a bit tired. Need to improve sleep quality.",
//   },
//   {
//     id: 3,
//     date: "2023-06-05",
//     weight: 76.8,
//     height: 180,
//     calories: 2200,
//     diet: "Followed my meal plan strictly. Had a protein shake after workout.",
//     notes: "Feeling good. Noticed some improvement in energy levels.",
//   },
// ];

export default function HealthTracker({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const { data } = useGetAllData(selectedDate);
  const health = data?.health;
  console.log({ health });
  // const [entries, setEntries] = useState(sampleEntries);
  // const [newEntry, setNewEntry] = useState<GetHealthLogResponseDto>({
  //   weight: 0,
  //   height: 0,
  //   date: new Date().toISOString().split("T")[0],
  //   diet: [],
  //   notes: "",
  // });
  // const [editingEntry, setEditingEntry] = useState(null);
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

  // const handleAddEntry = () => {
  // if (!newEntry.weight || !newEntry.height) return;

  // const entry = {
  //   id: Date.now(),
  //   date: new Date().toISOString().split("T")[0],
  //   weight: Number.parseFloat(newEntry.weight),
  //   height: Number.parseFloat(newEntry.height),
  //   calories: newEntry.calories ? Number.parseInt(newEntry.calories) : 0,
  //   diet: newEntry.diet,
  //   notes: newEntry.notes,
  // };

  // setEntries([entry, ...entries]);
  // setNewEntry({
  //   weight: "",
  //   height: "",
  //   calories: "",
  //   diet: "",
  //   notes: "",
  // });
  // setIsAddDialogOpen(false);
  // };

  // const handleEditEntry = () => {
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
  // };

  const handleDeleteEntry = (date: string) => {
    console.log(date);
    // setEntries(entries.filter((entry) => entry.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getWeightTrend = (index: number) => {
    console.log(index);
    // if (index >= filteredEntries.length - 1) return null;
    // const currentWeight = filteredEntries[index].weight;
    // const previousWeight = filteredEntries[index + 1].weight;
    // if (currentWeight < previousWeight) {
    //   return <TrendingDown className="h-4 w-4 text-green-500" />;
    // } else if (currentWeight > previousWeight) {
    //   return <TrendingUp className="h-4 w-4 text-red-500" />;
    // }
    return null;
  };

  if (!data) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Health Tracker</h2>
        <AddHealthLog open={isAddDialogOpen} onToggle={setIsAddDialogOpen} />
      </div>

      {health?.diet?.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No entries yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Start tracking your health metrics.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {health?.diet.map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center">
                    Health Log - {formatDate(data.date)}
                    {getWeightTrend(index)}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <AddHealthLog
                      open={isEditDialogOpen}
                      onToggle={setIsEditDialogOpen}
                      isAdding={false}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEntry(data.date)}
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
                    <p className="text-lg font-semibold">{data.weight} kg</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Height
                    </p>
                    <p className="text-lg font-semibold">{data.height} cm</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      BMI
                    </p>
                    <p className="text-lg font-semibold">
                      {(data.weight / Math.pow(data.height / 100, 2)).toFixed(
                        1,
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Calories
                    </p>
                    <p className="text-lg font-semibold">
                      {health.diet.reduce((ac: number, c) => {
                        return ac + c.calories;
                      }, 0)}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Diet</h4>
                    <p className="text-sm text-muted-foreground">
                      {health.notes}
                    </p>
                  </div>
                  {/* {health.notes && (
                    <div>
                      <h4 className="font-medium mb-1">Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        {entry.notes}
                      </p>
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
