// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Save, Bell, Shield, Trash2 } from "lucide-react";
// import DashboardHeader from "@/components/DashboardHeader";
// import { useTheme } from "@/hooks/themes";

export default function SettingsPage() {
  return null;
  // const { theme, setTheme } = useTheme();
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [successMessage, setSuccessMessage] = useState("");

  // const [notificationSettings, setNotificationSettings] = useState({
  //   emailNotifications: true,
  //   pushNotifications: true,
  //   weeklyDigest: false,
  //   reminderAlerts: true,
  // });

  // const [privacySettings, setPrivacySettings] = useState({
  //   publicProfile: false,
  //   showActivity: true,
  //   dataSharing: false,
  // });

  // useEffect(() => {
  //   // Check if user is logged in
  //   const userData = localStorage.getItem("user");
  //   if (userData) {
  //     setUser(JSON.parse(userData));

  //     // Load saved settings from localStorage if they exist
  //     const savedNotificationSettings = localStorage.getItem(
  //       "notificationSettings",
  //     );
  //     if (savedNotificationSettings) {
  //       setNotificationSettings(JSON.parse(savedNotificationSettings));
  //     }

  //     const savedPrivacySettings = localStorage.getItem("privacySettings");
  //     if (savedPrivacySettings) {
  //       setPrivacySettings(JSON.parse(savedPrivacySettings));
  //     }
  //   } else {
  //     // router.push("/login")
  //   }
  //   setLoading(false);
  // }, []);

  // const handleNotificationChange = (key) => {
  //   setNotificationSettings({
  //     ...notificationSettings,
  //     [key]: !notificationSettings[key],
  //   });
  // };

  // const handlePrivacyChange = (key) => {
  //   setPrivacySettings({
  //     ...privacySettings,
  //     [key]: !privacySettings[key],
  //   });
  // };

  // const saveSettings = () => {
  //   // Save settings to localStorage
  //   localStorage.setItem(
  //     "notificationSettings",
  //     JSON.stringify(notificationSettings),
  //   );
  //   localStorage.setItem("privacySettings", JSON.stringify(privacySettings));

  //   setSuccessMessage("Settings saved successfully!");
  //   setTimeout(() => setSuccessMessage(""), 3000);
  // };

  // const handleDeleteAccount = () => {
  //   // In a real app, this would send a request to delete the account
  //   // For now, we'll just show a confirmation dialog
  //   if (
  //     confirm(
  //       "Are you sure you want to delete your account? This action cannot be undone.",
  //     )
  //   ) {
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("notificationSettings");
  //     localStorage.removeItem("privacySettings");
  //     router.push("/login");
  //   }
  // };

  // // if (loading) {
  // //   return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  // // }

  // // if (!user) {
  // //   return null // Will redirect to login
  // // }

  // return (
  //   <div className="flex min-h-screen flex-col">
  //     <DashboardHeader />
  //     <main className="flex-1 p-4 md:p-6">
  //       <div className="mx-auto max-w-4xl">
  //         <h1 className="text-3xl font-bold mb-6">Settings</h1>

  //         {successMessage && (
  //           <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
  //             <AlertDescription>{successMessage}</AlertDescription>
  //           </Alert>
  //         )}

  //         <Tabs defaultValue="appearance" className="space-y-4">
  //           <TabsList>
  //             <TabsTrigger value="appearance">Appearance</TabsTrigger>
  //             <TabsTrigger value="notifications">Notifications</TabsTrigger>
  //             <TabsTrigger value="privacy">Privacy</TabsTrigger>
  //             <TabsTrigger value="account">Account</TabsTrigger>
  //           </TabsList>

  //           <TabsContent value="appearance">
  //             <Card>
  //               <CardHeader>
  //                 <CardTitle>Appearance</CardTitle>
  //                 <CardDescription>
  //                   Customize how the app looks and feels.
  //                 </CardDescription>
  //               </CardHeader>
  //               <CardContent className="space-y-6">
  //                 <div className="space-y-2">
  //                   <Label htmlFor="theme">Theme</Label>
  //                   <Select value={theme} onValueChange={setTheme}>
  //                     <SelectTrigger id="theme" className="w-full md:w-[180px]">
  //                       <SelectValue placeholder="Select theme" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       <SelectItem value="light">Light</SelectItem>
  //                       <SelectItem value="dark">Dark</SelectItem>
  //                       <SelectItem value="system">System</SelectItem>
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //               </CardContent>
  //               <CardFooter>
  //                 <Button onClick={saveSettings} className="ml-auto">
  //                   <Save className="mr-2 h-4 w-4" />
  //                   Save Changes
  //                 </Button>
  //               </CardFooter>
  //             </Card>
  //           </TabsContent>

  //           <TabsContent value="notifications">
  //             <Card>
  //               <CardHeader>
  //                 <CardTitle>Notifications</CardTitle>
  //                 <CardDescription>
  //                   Configure how you want to be notified.
  //                 </CardDescription>
  //               </CardHeader>
  //               <CardContent className="space-y-6">
  //                 <div className="flex items-center justify-between">
  //                   <div className="space-y-0.5">
  //                     <Label htmlFor="email-notifications">
  //                       Email Notifications
  //                     </Label>
  //                     <p className="text-sm text-muted-foreground">
  //                       Receive notifications via email.
  //                     </p>
  //                   </div>
  //                   <Switch
  //                     id="email-notifications"
  //                     checked={notificationSettings.emailNotifications}
  //                     onCheckedChange={() =>
  //                       handleNotificationChange("emailNotifications")
  //                     }
  //                   />
  //                 </div>

  //                 <div className="flex items-center justify-between">
  //                   <div className="space-y-0.5">
  //                     <Label htmlFor="push-notifications">
  //                       Push Notifications
  //                     </Label>
  //                     <p className="text-sm text-muted-foreground">
  //                       Receive push notifications on your device.
  //                     </p>
  //                   </div>
  //                   <Switch
  //                     id="push-notifications"
  //                     checked={notificationSettings.pushNotifications}
  //                     onCheckedChange={() =>
  //                       handleNotificationChange("pushNotifications")
  //                     }
  //                   />
  //                 </div>

  //                 <div className="flex items-center justify-between">
  //                   <div className="space-y-0.5">
  //                     <Label htmlFor="weekly-digest">Weekly Digest</Label>
  //                     <p className="text-sm text-muted-foreground">
  //                       Receive a weekly summary of your activities.
  //                     </p>
  //                   </div>
  //                   <Switch
  //                     id="weekly-digest"
  //                     checked={notificationSettings.weeklyDigest}
  //                     onCheckedChange={() =>
  //                       handleNotificationChange("weeklyDigest")
  //                     }
  //                   />
  //                 </div>

  //                 <div className="flex items-center justify-between">
  //                   <div className="space-y-0.5">
  //                     <Label htmlFor="reminder-alerts">Reminder Alerts</Label>
  //                     <p className="text-sm text-muted-foreground">
  //                       Get reminders for upcoming events.
  //                     </p>
  //                   </div>
  //                   <Switch
  //                     id="reminder-alerts"
  //                     checked={notificationSettings.reminderAlerts}
  //                     onCheckedChange={() =>
  //                       handleNotificationChange("reminderAlerts")
  //                     }
  //                   />
  //                 </div>
  //               </CardContent>
  //               <CardFooter>
  //                 <Button onClick={saveSettings} className="ml-auto">
  //                   <Bell className="mr-2 h-4 w-4" />
  //                   Save Notification Settings
  //                 </Button>
  //               </CardFooter>
  //             </Card>
  //           </TabsContent>

  //           <TabsContent value="privacy">
  //             <Card>
  //               <CardHeader>
  //                 <CardTitle>Privacy</CardTitle>
  //                 <CardDescription>
  //                   Manage your privacy settings.
  //                 </CardDescription>
  //               </CardHeader>
  //               <CardContent className="space-y-6">
  //                 <div className="flex items-center justify-between">
  //                   <div className="space-y-0.5">
  //                     <Label htmlFor="public-profile">Public Profile</Label>
  //                     <p className="text-sm text-muted-foreground">
  //                       Make your profile visible to others.
  //                     </p>
  //                   </div>
  //                   <Switch
  //                     id="public-profile"
  //                     checked={privacySettings.publicProfile}
  //                     onCheckedChange={() =>
  //                       handlePrivacyChange("publicProfile")
  //                     }
  //                   />
  //                 </div>

  //                 <div className="flex items-center justify-between">
  //                   <div className="space-y-0.5">
  //                     <Label htmlFor="show-activity">Show Activity</Label>
  //                     <p className="text-sm text-muted-foreground">
  //                       Show your activity status to others.
  //                     </p>
  //                   </div>
  //                   <Switch
  //                     id="show-activity"
  //                     checked={privacySettings.showActivity}
  //                     onCheckedChange={() =>
  //                       handlePrivacyChange("showActivity")
  //                     }
  //                   />
  //                 </div>

  //                 <div className="flex items-center justify-between">
  //                   <div className="space-y-0.5">
  //                     <Label htmlFor="data-sharing">Data Sharing</Label>
  //                     <p className="text-sm text-muted-foreground">
  //                       Allow anonymous data sharing for app improvement.
  //                     </p>
  //                   </div>
  //                   <Switch
  //                     id="data-sharing"
  //                     checked={privacySettings.dataSharing}
  //                     onCheckedChange={() => handlePrivacyChange("dataSharing")}
  //                   />
  //                 </div>
  //               </CardContent>
  //               <CardFooter>
  //                 <Button onClick={saveSettings} className="ml-auto">
  //                   <Shield className="mr-2 h-4 w-4" />
  //                   Save Privacy Settings
  //                 </Button>
  //               </CardFooter>
  //             </Card>
  //           </TabsContent>

  //           <TabsContent value="account">
  //             <Card>
  //               <CardHeader>
  //                 <CardTitle>Account</CardTitle>
  //                 <CardDescription>
  //                   Manage your account settings.
  //                 </CardDescription>
  //               </CardHeader>
  //               <CardContent className="space-y-6">
  //                 <div className="space-y-4">
  //                   <h3 className="text-lg font-medium">Danger Zone</h3>
  //                   <p className="text-sm text-muted-foreground">
  //                     Once you delete your account, there is no going back.
  //                     Please be certain.
  //                   </p>
  //                   <Button variant="destructive" onClick={handleDeleteAccount}>
  //                     <Trash2 className="mr-2 h-4 w-4" />
  //                     Delete Account
  //                   </Button>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           </TabsContent>
  //         </Tabs>
  //       </div>
  //     </main>
  //   </div>
  // );
}
