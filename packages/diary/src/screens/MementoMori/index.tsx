import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { useNavigate } from "react-router";

// Average life expectancy in years
const AVERAGE_LIFE_EXPECTANCY = 80;

export default function MementoMoriPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [birthdate, setBirthdate] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState(AVERAGE_LIFE_EXPECTANCY);
  const [viewMode, setViewMode] = useState("weeks");

  // Load saved birthdate from localStorage
  useEffect(() => {
    const savedBirthdate = localStorage.getItem("birthdate");
    if (savedBirthdate) {
      setBirthdate(savedBirthdate);
    }

    const savedLifeExpectancy = localStorage.getItem("lifeExpectancy");
    if (savedLifeExpectancy) {
      setLifeExpectancy(Number.parseInt(savedLifeExpectancy));
    }
  }, []);

  // Save birthdate to localStorage when it changes
  useEffect(() => {
    if (birthdate) {
      localStorage.setItem("birthdate", birthdate);
    }
  }, [birthdate]);

  // Save life expectancy to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("lifeExpectancy", lifeExpectancy.toString());
  }, [lifeExpectancy]);

  // useEffect(() => {
  //   // Check if user is logged in
  //   const userData = localStorage.getItem("user")
  //   if (userData) {
  //     setUser(JSON.parse(userData))er(JSON.parse(userData))
  //   } else {
  //     navigate("/login")
  //   }
  //   setLoading(false)
  // }, [navigate])

  // Calculate age in years
  const calculateAge = () => {
    if (!birthdate) return 0;

    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Calculate weeks lived and remaining
  const calculateWeeks = () => {
    if (!birthdate) return { lived: 0, remaining: 0, total: 0 };

    const birth = new Date(birthdate);
    const today = new Date();

    // Milliseconds in a week
    const weekMs = 7 * 24 * 60 * 60 * 1000;

    // Calculate weeks lived
    const weeksLived = Math.floor((today - birth) / weekMs);

    // Calculate total weeks in life expectancy
    const totalWeeks = lifeExpectancy * 52;

    // Calculate remaining weeks
    const remainingWeeks = Math.max(0, totalWeeks - weeksLived);

    return {
      lived: weeksLived,
      remaining: remainingWeeks,
      total: totalWeeks,
    };
  };

  // Calculate months lived and remaining
  const calculateMonths = () => {
    if (!birthdate) return { lived: 0, remaining: 0, total: 0 };

    const birth = new Date(birthdate);
    const today = new Date();

    // Calculate months lived
    const monthsLived =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());

    // Calculate total months in life expectancy
    const totalMonths = lifeExpectancy * 12;

    // Calculate remaining months
    const remainingMonths = Math.max(0, totalMonths - monthsLived);

    return {
      lived: monthsLived,
      remaining: remainingMonths,
      total: totalMonths,
    };
  };

  // Calculate years lived and remaining
  const calculateYears = () => {
    if (!birthdate) return { lived: 0, remaining: 0, total: 0 };

    const age = calculateAge();

    return {
      lived: age,
      remaining: Math.max(0, lifeExpectancy - age),
      total: lifeExpectancy,
    };
  };

  // Get data based on view mode
  const getData = () => {
    switch (viewMode) {
      case "weeks":
        return calculateWeeks();
      case "months":
        return calculateMonths();
      case "years":
        return calculateYears();
      default:
        return calculateWeeks();
    }
  };

  // Generate grid of boxes
  const generateGrid = () => {
    const data = getData();
    const boxes = [];

    for (let i = 0; i < data.total; i++) {
      boxes.push(
        <div
          key={i}
          className={`
            w-full aspect-square rounded-sm border
            ${i < data.lived ? "bg-primary/20 border-primary/50" : "bg-muted/20 border-muted"}
          `}
          title={`${viewMode.slice(0, -1)} ${i + 1}`}
        />,
      );
    }

    return boxes;
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

  const data = getData();

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold">Memento Mori Calendar</h1>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground italic">
                "Remember that you will die"
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Life in Perspective</CardTitle>
                <CardDescription>
                  Enter your birthdate to visualize your life journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="life-expectancy">
                      Life Expectancy (years)
                    </Label>
                    <Input
                      id="life-expectancy"
                      type="number"
                      min="1"
                      max="120"
                      value={lifeExpectancy}
                      onChange={(e) =>
                        setLifeExpectancy(
                          Number.parseInt(e.target.value) ||
                            AVERAGE_LIFE_EXPECTANCY,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="view-mode">View Mode</Label>
                    <Select value={viewMode} onValueChange={setViewMode}>
                      <SelectTrigger id="view-mode">
                        <SelectValue placeholder="Select view mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="years">Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {birthdate ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Life Journey</CardTitle>
                    <CardDescription>
                      Based on a life expectancy of {lifeExpectancy} years
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Age</span>
                        <span className="text-2xl font-bold">
                          {calculateAge()} years
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Lived</span>
                          <span>
                            {data.lived} {viewMode}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${(data.lived / data.total) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Remaining</span>
                          <span>
                            {data.remaining} {viewMode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Life in {viewMode}</CardTitle>
                    <CardDescription>
                      Each box represents one {viewMode.slice(0, -1)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-12 md:grid-cols-24 lg:grid-cols-52 gap-1">
                      {generateGrid()}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-primary/20 border border-primary/50" />
                        <span>
                          Lived: {data.lived} {viewMode}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-muted/20 border border-muted" />
                        <span>
                          Remaining: {data.remaining} {viewMode}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="md:col-span-3">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="mb-4 text-center text-muted-foreground">
                    Enter your birthdate to see your life in perspective
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
