import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { PlusCircle, Trash, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  CreateGymNotesResponseDto,
  GetGymProgressResponseDto,
  UpdateGymNotesResponseDto,
} from "@vipulwaghmare/apis";

const defaultExerciseValue: GetGymProgressResponseDto["exercises"][0] = {
  name: "",
  reps: 0,
  sets: 0,
  _id: "",
};

const AddGymNote = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isAdding = true,
  onCreate,
  onUpdate,
}: {
  isAdding?: boolean;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  onCreate: (data: Omit<CreateGymNotesResponseDto, "date">) => void;
  onUpdate: (data: Omit<UpdateGymNotesResponseDto, "date">) => void;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GetGymProgressResponseDto>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });
  const onSubmit = handleSubmit((data) => {
    if (isAdding) {
      onCreate(data);
    } else {
      onUpdate({
        id: data._id,
        type: data.type,
        duration: data.duration,
        exercises: data.exercises,
        notes: data.notes,
      });
    }
  });
  console.log({ errors });
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        {isAdding ? (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Workout
          </Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Workout</DialogTitle>
          <DialogDescription>
            Record your workout details including exercises, sets, reps, and
            weights.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="workout-type">Workout Type</Label>

              <Controller
                name="type"
                control={control}
                render={({ field }) => {
                  return (
                    <Select {...field} onValueChange={field.onChange}>
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
                  );
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="duration" type="number" />
                )}
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
                onClick={() => append(defaultExerciseValue)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Exercise
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-2 items-end border p-2 rounded-md"
              >
                <div className="col-span-4 grid gap-1">
                  <Label
                    htmlFor={`${field.id}-name-${index}`}
                    className="text-xs"
                  >
                    Exercise
                  </Label>

                  <Controller
                    name={`exercises.${index}.name`}
                    control={control}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`${field.id}-name-${index}`}
                        placeholder="Bench Press"
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 grid gap-1">
                  <Label
                    htmlFor={`${field.id}-sets-${index}`}
                    className="text-xs"
                  >
                    Sets
                  </Label>
                  <Controller
                    name={`exercises.${index}.sets`}
                    control={control}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`${field.id}-sets-${index}`}
                        type="number"
                        placeholder="3"
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 grid gap-1">
                  <Label
                    htmlFor={`${field.id}-reps-${index}`}
                    className="text-xs"
                  >
                    Reps
                  </Label>
                  <Controller
                    name={`exercises.${index}.reps`}
                    control={control}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`${field.id}-reps-${index}`}
                        type="number"
                        placeholder="3"
                      />
                    )}
                  />
                </div>
                <div className="col-span-3 grid gap-1">
                  <Label
                    htmlFor={`${field.id}-weight-${index}`}
                    className="text-xs"
                  >
                    Weight (kg)
                  </Label>
                  <Controller
                    name={`exercises.${index}.weight`}
                    control={control}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`${field.id}-weight-${index}`}
                        type="number"
                        placeholder="50"
                      />
                    )}
                  />
                </div>
                <div className="col-span-3 grid gap-1">
                  <Label
                    htmlFor={`${field.id}-duration-${index}`}
                    className="text-xs"
                  >
                    Duration
                  </Label>
                  <Controller
                    name={`exercises.${index}.duration`}
                    control={control}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`${field.id}-duration-${index}`}
                        type="number"
                        placeholder="50"
                      />
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => <Textarea {...field} id="notes" />}
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Save Workout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGymNote;
