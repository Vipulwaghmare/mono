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
import { Edit, Plus, PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { GetHealthLogResponseDto } from "@vipulwaghmare/apis";

const defaultDietValue: GetHealthLogResponseDto["diet"][0] = {
  name: "",
  calories: 0,
};

const AddHealthLog = ({
  open,
  onToggle,
  isAdding = true,
}: {
  isAdding?: boolean;
  open: boolean;
  onToggle: (val: boolean) => void;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GetHealthLogResponseDto>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "diet",
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  console.log({ errors });
  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>
        {isAdding ? (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        )}
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
              <Label htmlFor="weight">Weight</Label>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="weight"
                    type="number"
                    placeholder="75.5"
                  />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="height"
                    type="number"
                    placeholder="75.5"
                  />
                )}
              />
            </div>
          </div>
          {/* <div className="grid gap-2">
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
              </div> */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Diet</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append(defaultDietValue)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Diet
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
                    Diet
                  </Label>

                  <Controller
                    name={`diet.${index}.name`}
                    control={control}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`${field.id}-name-${index}`}
                        placeholder="Eggs"
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 grid gap-1">
                  <Label
                    htmlFor={`${field.id}-calories-${index}`}
                    className="text-xs"
                  >
                    Calories
                  </Label>
                  <Controller
                    name={`diet.${index}.calories`}
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
            <Label htmlFor="notes">Additional Notes</Label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="notes"
                  placeholder="How are you feeling? Any other health observations?"
                />
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onToggle(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Save Entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddHealthLog;
