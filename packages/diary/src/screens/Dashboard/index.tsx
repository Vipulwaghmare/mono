import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  // BookOpen,
  // Briefcase,
  // Heart,
  // Dumbbell,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Bell,
} from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import PersonalEntryList from "@/components/PersonalEntryList";
import WorkEntryList from "@/components/WorkEntryList";
import HealthTracker from "@/components/HealthTracker";
import GymProgress from "@/components/GymProgress";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import api from "@/apis/instance";
import { GetEventsResponse } from "@vipulwaghmare/apis";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const { data } = useQuery<any, any, GetEventsResponse>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await api.diaryControllerGetTodaysEvents();
      return res.data;
    },
  });
  // const [events, setEvents] = useState(sampleEvents);
  const [showEvents, setShowEvents] = useState(true);

  // Get today's events
  // const todayEvents = events.filter(
  //   (event) => event.date === new Date().toISOString().split("T")[0],
  // );

  // Get selected day's events
  // const selectedDayEvents = events.filter(
  //   (event) => event.date === selectedDate,
  // );

  // useEffect(() => {
  //   const savedEvents = localStorage.getItem("events");
  //   if (savedEvents) {
  //     setEvents(JSON.parse(savedEvents));
  //   }
  // }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Navigate to previous day
  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  // Navigate to next day
  const goToNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  // Dismiss event alert
  const dismissEventAlert = () => {
    setShowEvents(false);
  };
  console.log({ data });
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Diary</h1>
            <Button onClick={() => navigate("/dashboard/calendar")}>
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </div>

          {/* Today's Events Alert */}
          {data && showEvents && data.events.length > 0 && (
            <Alert className="mb-6">
              <Bell className="h-4 w-4" />
              <AlertTitle>Events Today</AlertTitle>
              <AlertDescription>
                <div className="mt-2 space-y-2">
                  {data.events.map((event) => (
                    <div key={event.id} className="text-sm">
                      <span className="font-medium">{event.title}</span> -{" "}
                      {event.description}
                    </div>
                  ))}
                </div>
              </AlertDescription>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={dismissEventAlert}
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          )}

          {/* Date Selection */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="icon" onClick={goToPreviousDay}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
              <span className="text-lg font-medium">
                {formatDate(selectedDate)}
              </span>
            </div>
            <Button variant="outline" size="icon" onClick={goToNextDay}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Selected Day's Events */}
          {/* {data && data.events.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Events on this day</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )} */}
          {/* 
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Personal Entries
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Work Entries
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Health Logs
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Same as last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Gym Sessions
                </CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last week
                </p>
              </CardContent>
            </Card>
          </div> */}

          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="gym">Gym Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="space-y-4">
              <PersonalEntryList selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="work" className="space-y-4">
              <WorkEntryList selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="health" className="space-y-4">
              <HealthTracker selectedDate={selectedDate} />
            </TabsContent>
            <TabsContent value="gym" className="space-y-4">
              <GymProgress selectedDate={selectedDate} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
