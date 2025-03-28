import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  BookOpen,
  Briefcase,
  Heart,
  Dumbbell,
  Search,
  Calendar,
  Filter,
} from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";

// Sample data for demonstration
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

export default function EntriesPage() {
  const [entries] = useState(sampleEntries);
  const [filteredEntries, setFilteredEntries] = useState(sampleEntries);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");

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

  useEffect(() => {
    // Apply filters
    let filtered = entries;

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((entry) => entry.type === typeFilter);
    }

    // Date filter
    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((entry) => entry.date === today);
    } else if (dateFilter === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter((entry) => new Date(entry.date) >= oneWeekAgo);
    } else if (dateFilter === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filtered = filtered.filter(
        (entry) => new Date(entry.date) >= oneMonthAgo,
      );
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(query) ||
          entry.content.toLowerCase().includes(query),
      );
    }

    setFilteredEntries(filtered);
  }, [entries, typeFilter, dateFilter, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "personal":
        return "Personal";
      case "work":
        return "Work";
      case "health":
        return "Health";
      case "gym":
        return "Gym";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "personal":
        return "bg-blue-100 text-blue-800";
      case "work":
        return "bg-purple-100 text-purple-800";
      case "health":
        return "bg-green-100 text-green-800";
      case "gym":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return null // Will redirect to login
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold">All Entries</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search entries..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Type</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="gym">Gym</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[130px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Date</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-semibold">No entries found</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("all");
                  setDateFilter("today");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEntries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 rounded-md ${getTypeColor(entry.type)}`}
                        >
                          <entry.icon className="h-4 w-4" />
                        </div>
                        <CardTitle className="text-lg">{entry.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="flex justify-between pt-1">
                      <span>{formatDate(entry.date)}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(entry.type)}`}
                      >
                        {getTypeLabel(entry.type)}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm">{entry.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        // In a real app, this would navigate to the entry detail page
                        alert(`Viewing entry: ${entry.title}`);
                      }}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {filteredEntries.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
