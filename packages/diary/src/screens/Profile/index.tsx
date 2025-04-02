import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/DashboardHeader";
import PersonalProfile from "./PersonalProfile";
import SecurityProfile from "./SecurityProfiile";
export default function ProfilePage() {
  // const getInitials = (name: string) => {
  //   if (!name) return "U";
  //   return name
  //     .split(" ")
  //     .map((part) => part[0])
  //     .join("")
  //     .toUpperCase();
  // };

  // if (false) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          {/* <h1 className="text-3xl font-bold mb-6">Profile</h1> */}

          {/* <div className="mb-8 flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt={user.name || "User"}
              />
              <AvatarFallback className="text-2xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name || "User"}</h2>
              <p className="text-muted-foreground">{user.email || ""}</p>
              <Button variant="outline" size="sm" className="mt-2">
                Change Avatar
              </Button>
            </div>
          </div> */}

          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalProfile />
            </TabsContent>

            <TabsContent value="security">
              <SecurityProfile />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
