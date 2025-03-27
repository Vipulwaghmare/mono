import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Trash } from "lucide-react";
import useGetAllData from "@/hooks/useGetAllData";
import { GetGymProgressResponseDto } from "@vipulwaghmare/apis";
import AddGymNote from "./forms/AddGymNote";

// Update the component definition to accept selectedDate prop
export default function GymProgress({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const { data } = useGetAllData(selectedDate);
  const workouts = data?.gym ?? [];
  console.log({ workouts });
  // const {
  //   watch,
  //   // control,
  //   // formState: { errors },
  // } = useForm<{
  //   date: "";
  //   type: "";
  //   data: GetGymProgressResponseDto[];
  // }>();
  // const [newWorkout, setNewWorkout] = useState<GetGymProgressResponseDto>({
  //   type: "",
  //   duration: 0,
  //   date: "",
  //   id: 1,
  //   exercises: [{ name: "", sets: 0, reps: 0, weight: 0, duration: 50 }],
  //   notes: "",
  // });
  const [editingWorkout, setEditingWorkout] =
    useState<GetGymProgressResponseDto | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Inside the component, add this after the useState declarations:
  // const [filteredWorkouts, setFilteredWorkouts] = useState<TEntry[]>([]);

  // Add this useEffect to filter workouts by selected date
  // useEffect(() => {
  //   if (selectedDate) {
  //     setFilteredWorkouts(
  //       workouts.filter((workout) => workout.date === selectedDate),
  //     );
  //   } else {
  //     setFilteredWorkouts(workouts);
  //   }
  // }, [workouts, selectedDate]);

  // const handleAddExercise = () => {
  // setNewWorkout({
  //   ...newWorkout,
  //   exercises: [
  //     ...newWorkout.exercises,
  //     { name: "", sets: "", reps: "", weight: "" },
  //   ],
  // });
  // };

  // const handleRemoveExercise = (index: number) => {
  //   const exercises = [...newWorkout.exercises];
  //   exercises.splice(index, 1);
  //   setNewWorkout({ ...newWorkout, exercises });
  // };

  // const handleExerciseChange = (index: number, field, value) => {
  //   const exercises = [...newWorkout.exercises];
  //   exercises[index] = { ...exercises[index], [field]: value };
  //   setNewWorkout({ ...newWorkout, exercises });
  // };

  // const handleEditExerciseChange = (index: number, field, value) => {
  //   if (!editingWorkout) return;
  //   const exercises = [...editingWorkout.exercises];
  //   exercises[index] = { ...exercises[index], [field]: value };
  //   setEditingWorkout({ ...editingWorkout, exercises });
  // };

  // const handleAddEditExercise = () => {
  //   if (!editingWorkout) return;
  //   setEditingWorkout({
  //     ...editingWorkout,
  //     exercises: [
  //       ...editingWorkout.exercises,
  //       { name: "", sets: "", reps: "", weight: "" },
  //     ],
  //   });
  // };

  // const handleRemoveEditExercise = (index: number) => {
  //   if (!editingWorkout) return;
  //   const exercises = [...editingWorkout.exercises];
  //   exercises.splice(index, 1);
  //   setEditingWorkout({ ...editingWorkout, exercises });
  // };

  // const handleAddWorkout = () => {
  // if (!newWorkout.type || !newWorkout.duration) return;
  // // Validate exercises
  // const validExercises = newWorkout.exercises.filter(
  //   (ex) => ex.name && ex.sets && ex.reps,
  // );
  // if (validExercises.length === 0) return;
  // const workout = {
  //   id: Date.now(),
  //   date: new Date().toISOString().split("T")[0],
  //   type: newWorkout.type,
  //   duration: Number.parseInt(newWorkout.duration),
  //   exercises: validExercises.map((ex) => ({
  //     name: ex.name,
  //     sets: Number.parseInt(ex.sets),
  //     reps: Number.parseInt(ex.reps),
  //     weight: ex.weight ? Number.parseInt(ex.weight) : 0,
  //   })),
  //   notes: newWorkout.notes,
  // };
  // setWorkouts([workout, ...workouts]);
  // setNewWorkout({
  //   type: "",
  //   duration: "",
  //   exercises: [{ name: "", sets: "", reps: "", weight: "" }],
  //   notes: "",
  // });
  // setIsAddDialogOpen(false);
  // };

  // const handleEditWorkout = () => {
  // if (!editingWorkout || !editingWorkout.type || !editingWorkout.duration)
  //   return;
  // // Validate exercises
  // const validExercises = editingWorkout.exercises.filter(
  //   (ex) => ex.name && ex.sets && ex.reps,
  // );
  // if (validExercises.length === 0) return;
  // const updatedWorkout = {
  //   ...editingWorkout,
  //   duration: Number.parseInt(editingWorkout.duration),
  //   exercises: validExercises.map((ex) => ({
  //     name: ex.name,
  //     sets: Number.parseInt(ex.sets),
  //     reps: Number.parseInt(ex.reps),
  //     weight: ex.weight ? Number.parseInt(ex.weight) : 0,
  //   })),
  // };
  // setWorkouts(
  //   workouts.map((workout) =>
  //     workout.id === editingWorkout.id ? updatedWorkout : workout,
  //   ),
  // );
  // setEditingWorkout(null);
  // setIsEditDialogOpen(false);
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gym Progress</h2>
        <AddGymNote
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
        />
      </div>

      {workouts.length === 0 ? (
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
          {workouts.map((workout) => (
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
                    <AddGymNote
                      isAdding={false}
                      isAddDialogOpen={
                        isEditDialogOpen && editingWorkout?.id === workout.id
                      }
                      setIsAddDialogOpen={(open) => {
                        setIsEditDialogOpen(open);
                        if (open) setEditingWorkout({ ...workout });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      // onClick={() => handleDeleteWorkout(workout.id)}
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
                            {exercise.weight && exercise.weight > 0
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
