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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Phone, MapPin, Calendar, Save } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "vipul",
    email: "vipulw@ice.afda",
  });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    birthdate: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Initialize form data with user data
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        address: parsedUser.address || "",
        bio: parsedUser.bio || "",
        birthdate: parsedUser.birthdate || "",
      });
    } else {
      // router.push("/login")
    }
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    // In a real app, you would send this data to your backend
    // For now, we'll just update the local storage
    const updatedUser = {
      ...user,
      ...formData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New passwords do not match");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // In a real app, you would verify the current password and update with the new one
    // For now, we'll just show a success message

    setSuccessMessage("Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // if (!user) {
  //   return null // Will redirect to login
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>

          <div className="mb-8 flex flex-col md:flex-row items-center gap-6">
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
          </div>

          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <form onSubmit={handleProfileUpdate}>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {successMessage && (
                      <Alert className="bg-green-50 text-green-800 border-green-200">
                        <AlertDescription>{successMessage}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthdate">Birthdate</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            value={formData.birthdate}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us a little about yourself"
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <form onSubmit={handlePasswordUpdate}>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Update your password here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {successMessage && (
                      <Alert className="bg-green-50 text-green-800 border-green-200">
                        <AlertDescription>{successMessage}</AlertDescription>
                      </Alert>
                    )}

                    {errorMessage && (
                      <Alert variant="destructive">
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
