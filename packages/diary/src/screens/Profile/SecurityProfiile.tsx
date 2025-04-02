import { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save } from "lucide-react";
import { authApi } from "@/apis/instance";
import { useMutation } from "@tanstack/react-query";
import { UpdatePasswordDto } from "@vipulwaghmare/apis";

const SecurityProfile = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const updateApi = useMutation({
    mutationFn: async (body: UpdatePasswordDto) => {
      const res = await authApi.authControllerUpdatePassword(body);
      return res.data;
    },
    onSuccess: () => {
      setSuccessMessage("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: () => {
      setErrorMessage("Failed to update password!");
    },
  });

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    updateApi.mutate({
      password: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };
  return (
    <Card>
      <form onSubmit={handlePasswordUpdate}>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Update your password here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
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
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
          <Button type="submit" className="ml-auto mt-4">
            <Save className="mr-2 h-4 w-4" />
            Update Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SecurityProfile;
