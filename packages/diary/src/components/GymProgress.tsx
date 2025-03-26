import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TEntry = {
  id: number;
  date: string;
  type: string;
  duration: number;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: number;
  }[];
  notes: string;
};
// Sample data for demonstration
const sampleWorkouts: TEntry[] = [
  {
    id: 1,
    date: new Date().toISOString().split("T")[0],
    type: "Strength Training",
    duration: 60,
    exercises: [
      { name: "Bench Press", sets: 3, reps: 10, weight: 80 },
      { name: "Squats", sets: 4, reps: 8, weight: 100 },
      { name: "Deadlift", sets: 3, reps: 6, weight: 120 },
    ],
    notes: "Great workout today. Increased weight on bench press.",
  },
  {
    id: 2,
    date: new Date().toISOString().split("T")[0],
    type: "Cardio",
    duration: 45,
    exercises: [
      { name: "Treadmill", sets: 1, reps: 1, weight: 0, duration: 30 },
      { name: "Cycling", sets: 1, reps: 1, weight: 0, duration: 15 },
    ],
    notes: "Focused on cardio today. Felt good.",
  },
  {
    id: 3,
    date: new Date().toISOString().split("T")[0],
    type: "Strength Training",
    duration: 75,
    exercises: [
      { name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
      { name: "Barbell Rows", sets: 3, reps: 10, weight: 60 },
      { name: "Shoulder Press", sets: 3, reps: 10, weight: 40 },
      { name: "Bicep Curls", sets: 3, reps: 12, weight: 15 },
    ],
    notes: "Back and biceps day. Increased reps on pull-ups.",
  },
];

// Update the component definition to accept selectedDate prop
export default function GymProgress({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const [workouts, setWorkouts] = useState(sampleWorkouts);
  const [newWorkout, setNewWorkout] = useState({
    type: "",
    duration: "",
    exercises: [{ name: "", sets: "", reps: "", weight: "" }],
    notes: "",
  });
  const [editingWorkout, setEditingWorkout] = useState<TEntry | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Inside the component, add this after the useState declarations:
  const [filteredWorkouts, setFilteredWorkouts] = useState<TEntry[]>([]);

  // Add this useEffect to filter workouts by selected date
  useEffect(() => {
    if (selectedDate) {
      setFilteredWorkouts(
        workouts.filter((workout) => workout.date === selectedDate),
      );
    } else {
      setFilteredWorkouts(workouts);
    }
  }, [workouts, selectedDate]);

  const handleAddExercise = () => {
    setNewWorkout({
      ...newWorkout,
      exercises: [
        ...newWorkout.exercises,
        { name: "", sets: "", reps: "", weight: "" },
      ],
    });
  };

  const handleRemoveExercise = (index: number) => {
    const exercises = [...newWorkout.exercises];
    exercises.splice(index, 1);
    setNewWorkout({ ...newWorkout, exercises });
  };

  const handleExerciseChange = (index: number, field, value) => {
    const exercises = [...newWorkout.exercises];
    exercises[index] = { ...exercises[index], [field]: value };
    setNewWorkout({ ...newWorkout, exercises });
  };

  const handleEditExerciseChange = (index: number, field, value) => {
    if (!editingWorkout) return;
    const exercises = [...editingWorkout.exercises];
    exercises[index] = { ...exercises[index], [field]: value };
    setEditingWorkout({ ...editingWorkout, exercises });
  };

  const handleAddEditExercise = () => {
    if (!editingWorkout) return;
    setEditingWorkout({
      ...editingWorkout,
      exercises: [
        ...editingWorkout.exercises,
        { name: "", sets: "", reps: "", weight: "" },
      ],
    });
  };

  const handleRemoveEditExercise = (index: number) => {
    if (!editingWorkout) return;
    const exercises = [...editingWorkout.exercises];
    exercises.splice(index, 1);
    setEditingWorkout({ ...editingWorkout, exercises });
  };

  const handleAddWorkout = () => {
    if (!newWorkout.type || !newWorkout.duration) return;

    // Validate exercises
    const validExercises = newWorkout.exercises.filter(
      (ex) => ex.name && ex.sets && ex.reps,
    );
    if (validExercises.length === 0) return;

    const workout = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      type: newWorkout.type,
      duration: Number.parseInt(newWorkout.duration),
      exercises: validExercises.map((ex) => ({
        name: ex.name,
        sets: Number.parseInt(ex.sets),
        reps: Number.parseInt(ex.reps),
        weight: ex.weight ? Number.parseInt(ex.weight) : 0,
      })),
      notes: newWorkout.notes,
    };

    setWorkouts([workout, ...workouts]);
    setNewWorkout({
      type: "",
      duration: "",
      exercises: [{ name: "", sets: "", reps: "", weight: "" }],
      notes: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditWorkout = () => {
    if (!editingWorkout || !editingWorkout.type || !editingWorkout.duration)
      return;

    // Validate exercises
    const validExercises = editingWorkout.exercises.filter(
      (ex) => ex.name && ex.sets && ex.reps,
    );
    if (validExercises.length === 0) return;

    const updatedWorkout = {
      ...editingWorkout,
      duration: Number.parseInt(editingWorkout.duration),
      exercises: validExercises.map((ex) => ({
        name: ex.name,
        sets: Number.parseInt(ex.sets),
        reps: Number.parseInt(ex.reps),
        weight: ex.weight ? Number.parseInt(ex.weight) : 0,
      })),
    };

    setWorkouts(
      workouts.map((workout) =>
        workout.id === editingWorkout.id ? updatedWorkout : workout,
      ),
    );

    setEditingWorkout(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gym Progress</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Workout</DialogTitle>
              <DialogDescription>
                Record your workout details including exercises, sets, reps, and
                weights.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="workout-type">Workout Type</Label>
                  <Select
                    value={newWorkout.type}
                    onValueChange={(value) =>
                      setNewWorkout({ ...newWorkout, type: value })
                    }
                  >
                    <SelectTrigger id="workout-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strength Training">
                        Strength Training
                      </SelectItem>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="HIIT">HIIT</SelectItem>
                      <SelectItem value="Yoga">Yoga</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newWorkout.duration}
                    onChange={(e) =>
                      setNewWorkout({ ...newWorkout, duration: e.target.value })
                    }
                    placeholder="60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Exercises</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddExercise}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Exercise
                  </Button>
                </div>

                {newWorkout.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 items-end border p-2 rounded-md"
                  >
                    <div className="col-span-4 grid gap-1">
                      <Label
                        htmlFor={`exercise-name-${index}`}
                        className="text-xs"
                      >
                        Exercise
                      </Label>
                      <Input
                        id={`exercise-name-${index}`}
                        value={exercise.name}
                        onChange={(e) =>
                          handleExerciseChange(index, "name", e.target.value)
                        }
                        placeholder="Bench Press"
                      />
                    </div>
                    <div className="col-span-2 grid gap-1">
                      <Label
                        htmlFor={`exercise-sets-${index}`}
                        className="text-xs"
                      >
                        Sets
                      </Label>
                      <Input
                        id={`exercise-sets-${index}`}
                        type="number"
                        value={exercise.sets}
                        onChange={(e) =>
                          handleExerciseChange(index, "sets", e.target.value)
                        }
                        placeholder="3"
                      />
                    </div>
                    <div className="col-span-2 grid gap-1">
                      <Label
                        htmlFor={`exercise-reps-${index}`}
                        className="text-xs"
                      >
                        Reps
                      </Label>
                      <Input
                        id={`exercise-reps-${index}`}
                        type="number"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleExerciseChange(index, "reps", e.target.value)
                        }
                        placeholder="10"
                      />
                    </div>
                    <div className="col-span-3 grid gap-1">
                      <Label
                        htmlFor={`exercise-weight-${index}`}
                        className="text-xs"
                      >
                        Weight (kg)
                      </Label>
                      <Input
                        id={`exercise-weight-${index}`}
                        type="number"
                        value={exercise.weight}
                        onChange={(e) =>
                          handleExerciseChange(index, "weight", e.target.value)
                        }
                        placeholder="50"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveExercise(index)}
                        disabled={newWorkout.exercises.length === 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newWorkout.notes}
                  onChange={(e) =>
                    setNewWorkout({ ...newWorkout, notes: e.target.value })
                  }
                  placeholder="How was your workout? Any achievements or challenges?"
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
              <Button onClick={handleAddWorkout}>Save Workout</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {filteredWorkouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No workouts yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Start tracking your gym progress.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Workout
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWorkouts.map((workout) => (
            <Card key={workout.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{workout.type}</CardTitle>
                    <CardDescription>
                      {formatDate(workout.date)} • {workout.duration} minutes
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog
                      open={
                        isEditDialogOpen && editingWorkout?.id === workout.id
                      }
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (open) setEditingWorkout({ ...workout });
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Workout</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-workout-type">
                                Workout Type
                              </Label>
                              <Select
                                value={editingWorkout?.type || ""}
                                onValueChange={(value) =>
                                  setEditingWorkout({
                                    ...editingWorkout,
                                    type: value,
                                  })
                                }
                              >
                                <SelectTrigger id="edit-workout-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Strength Training">
                                    Strength Training
                                  </SelectItem>
                                  <SelectItem value="Cardio">Cardio</SelectItem>
                                  <SelectItem value="HIIT">HIIT</SelectItem>
                                  <SelectItem value="Yoga">Yoga</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-duration">
                                Duration (minutes)
                              </Label>
                              <Input
                                id="edit-duration"
                                type="number"
                                value={editingWorkout?.duration || ""}
                                onChange={(e) =>
                                  setEditingWorkout({
                                    ...editingWorkout,
                                    duration: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Exercises</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddEditExercise}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add Exercise
                              </Button>
                            </div>

                            {editingWorkout?.exercises.map(
                              (exercise, index) => (
                                <div
                                  key={index}
                                  className="grid grid-cols-12 gap-2 items-end border p-2 rounded-md"
                                >
                                  <div className="col-span-4 grid gap-1">
                                    <Label
                                      htmlFor={`edit-exercise-name-${index}`}
                                      className="text-xs"
                                    >
                                      Exercise
                                    </Label>
                                    <Input
                                      id={`edit-exercise-name-${index}`}
                                      value={exercise.name}
                                      onChange={(e) =>
                                        handleEditExerciseChange(
                                          index,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-span-2 grid gap-1">
                                    <Label
                                      htmlFor={`edit-exercise-sets-${index}`}
                                      className="text-xs"
                                    >
                                      Sets
                                    </Label>
                                    <Input
                                      id={`edit-exercise-sets-${index}`}
                                      type="number"
                                      value={exercise.sets}
                                      onChange={(e) =>
                                        handleEditExerciseChange(
                                          index,
                                          "sets",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-span-2 grid gap-1">
                                    <Label
                                      htmlFor={`edit-exercise-reps-${index}`}
                                      className="text-xs"
                                    >
                                      Reps
                                    </Label>
                                    <Input
                                      id={`edit-exercise-reps-${index}`}
                                      type="number"
                                      value={exercise.reps}
                                      onChange={(e) =>
                                        handleEditExerciseChange(
                                          index,
                                          "reps",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-span-3 grid gap-1">
                                    <Label
                                      htmlFor={`edit-exercise-weight-${index}`}
                                      className="text-xs"
                                    >
                                      Weight (kg)
                                    </Label>
                                    <Input
                                      id={`edit-exercise-weight-${index}`}
                                      type="number"
                                      value={exercise.weight}
                                      onChange={(e) =>
                                        handleEditExerciseChange(
                                          index,
                                          "weight",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-span-1">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        handleRemoveEditExercise(index)
                                      }
                                      disabled={
                                        editingWorkout.exercises.length === 1
                                      }
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="edit-notes">Notes</Label>
                            <Textarea
                              id="edit-notes"
                              value={editingWorkout?.notes || ""}
                              onChange={(e) =>
                                setEditingWorkout({
                                  ...editingWorkout,
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
                          <Button onClick={handleEditWorkout}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteWorkout(workout.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Exercises</h4>
                    <div className="space-y-2">
                      {workout.exercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-4 text-sm p-2 rounded-md bg-muted"
                        >
                          <div className="font-medium">{exercise.name}</div>
                          <div>{exercise.sets} sets</div>
                          <div>{exercise.reps} reps</div>
                          <div>
                            {exercise.weight > 0
                              ? `${exercise.weight} kg`
                              : "Bodyweight"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {workout.notes && (
                    <div>
                      <h4 className="font-medium mb-1">Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        {workout.notes}
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
