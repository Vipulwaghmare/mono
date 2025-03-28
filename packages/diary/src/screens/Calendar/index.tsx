import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Briefcase,
  Heart,
  Dumbbell,
} from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";

// Sample data for demonstration - same as in entries page
const sampleEntries = [
  {
    id: 1,
    type: "personal",
    title: "Weekend Trip to the Mountains",
    content:
      "Had an amazing time hiking in the mountains this weekend. The views were breathtaking and the weather was perfect.",
    date: "2023-06-15",
    icon: BookOpen,
  },
  {
    id: 2,
    type: "work",
    title: "Project Milestone Achieved",
    content:
      "Successfully completed the first phase of the project ahead of schedule. The team worked really well together.",
    date: "2023-06-14",
    icon: Briefcase,
  },
  {
    id: 3,
    type: "health",
    title: "Health Log",
    content:
      "Weight: 75.5kg, Height: 180cm, Calories: 2100. Had a balanced diet with plenty of protein and vegetables.",
    date: "2023-06-15",
    icon: Heart,
  },
  {
    id: 4,
    type: "personal",
    title: "Family Dinner",
    content:
      "Had dinner with my parents and siblings. It was great catching up with everyone after so long.",
    date: "2023-06-10",
    icon: BookOpen,
  },
  {
    id: 5,
    type: "gym",
    title: "Strength Training",
    content:
      "60 min workout. Bench Press: 3x10 at 80kg, Squats: 4x8 at 100kg, Deadlift: 3x6 at 120kg.",
    date: "2023-06-15",
    icon: Dumbbell,
  },
  {
    id: 6,
    type: "work",
    title: "Client Meeting",
    content:
      "Had a productive meeting with the client. They were pleased with our progress and provided valuable feedback.",
    date: "2023-06-12",
    icon: Briefcase,
  },
  {
    id: 7,
    type: "personal",
    title: "New Book",
    content:
      "Started reading a new book today. It's a mystery novel that's been on my reading list for months.",
    date: "2023-06-05",
    icon: BookOpen,
  },
  {
    id: 8,
    type: "health",
    title: "Health Log",
    content:
      "Weight: 76.2kg, Height: 180cm, Calories: 2300. Had a cheat meal for dinner. Otherwise, stuck to my meal plan.",
    date: "2023-06-10",
    icon: Heart,
  },
  {
    id: 9,
    type: "gym",
    title: "Cardio",
    content: "45 min workout. Treadmill: 30 min, Cycling: 15 min.",
    date: "2023-06-12",
    icon: Dumbbell,
  },
  {
    id: 10,
    type: "work",
    title: "New Skills Learned",
    content:
      "Spent the day learning a new framework that will help streamline our development process.",
    date: "2023-06-08",
    icon: Briefcase,
  },
  {
    id: 11,
    type: "health",
    title: "Health Log",
    content:
      "Weight: 76.8kg, Height: 180cm, Calories: 2200. Followed my meal plan strictly. Had a protein shake after workout.",
    date: "2023-06-05",
    icon: Heart,
  },
  {
    id: 12,
    type: "gym",
    title: "Strength Training",
    content:
      "75 min workout. Pull-ups: 3x8, Barbell Rows: 3x10 at 60kg, Shoulder Press: 3x10 at 40kg, Bicep Curls: 3x12 at 15kg.",
    date: "2023-06-08",
    icon: Dumbbell,
  },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<typeof sampleEntries>(
    [],
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");

  // useEffect(() => {
  //   // Check if user is logged in
  //   const userData = localStorage.getItem("user")
  //   if (userData) {
  //     setUser(JSON.parse(userData))
  //   } else {
  //     navigate("/login")
  //   }
  //   setLoading(false)
  // }, [navigate])

  // Get entries for a specific date
  const getEntriesForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    let filtered = sampleEntries.filter((entry) => entry.date === dateString);

    if (typeFilter !== "all") {
      filtered = filtered.filter((entry) => entry.type === typeFilter);
    }

    return filtered;
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const entries = getEntriesForDate(date);
    setSelectedEntries(entries);
    setIsDialogOpen(true);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();

    // Total days in the month
    const daysInMonth = lastDay.getDate();

    // Array to hold all calendar days
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }

    return days;
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get entry count for a date
  const getEntryCount = (date: Date) => {
    return getEntriesForDate(date).length;
  };

  // Get entry type colors
  const getTypeColor = (type: string) => {
    switch (type) {
      case "personal":
        return "bg-blue-500";
      case "work":
        return "bg-purple-500";
      case "health":
        return "bg-green-500";
      case "gym":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get entry types for a date
  const getEntryTypes = (date: Date) => {
    const entries = getEntriesForDate(date);
    return [...new Set(entries.map((entry) => entry.type))];
  };

  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return null; // Will redirect to login
  // }
  const calendarDays = generateCalendarDays();

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold">Calendar</h1>
            <div className="flex items-center gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <span>Filter by type</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="gym">Gym</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {formatDate(currentDate)}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPreviousMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Day names */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="text-center font-medium py-2">
                      {day}
                    </div>
                  ),
                )}

                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      min-h-[100px] p-2 border rounded-md
                      ${day ? "cursor-pointer hover:bg-muted/50" : ""}
                      ${day && isToday(day) ? "border-primary" : "border-border"}
                    `}
                    onClick={() => day && handleDateClick(day)}
                  >
                    {day && (
                      <>
                        <div className="flex justify-between items-start">
                          <span
                            className={`text-sm font-medium ${isToday(day) ? "text-primary" : ""}`}
                          >
                            {day.getDate()}
                          </span>
                          {getEntryCount(day) > 0 && (
                            <span className="text-xs font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                              {getEntryCount(day)}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {getEntryTypes(day).map((type, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${getTypeColor(type)}`}
                              title={
                                type.charAt(0).toUpperCase() + type.slice(1)
                              }
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dialog for showing entries on a selected date */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedDate &&
                    selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </DialogTitle>
                <DialogDescription>
                  {selectedEntries.length === 0
                    ? "No entries for this date"
                    : `${selectedEntries.length} entries found`}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {selectedEntries.map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-md ${getTypeColor(entry.type)} text-white`}
                        >
                          <entry.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{entry.title}</h3>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full capitalize bg-muted">
                              {entry.type}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {entry.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {selectedEntries.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No entries for this date.
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setIsDialogOpen(false);
                        // In a real app, this would navigate to the new entry page with the date pre-filled
                        alert(
                          `Create new entry for ${selectedDate?.toLocaleDateString()}`,
                        );
                      }}
                    >
                      Add Entry
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
