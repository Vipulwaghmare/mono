import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { useNavigate } from "react-router";
import api from "../../apis/instance";
import { LoginUserDto, LoginResponseDto } from "@vipulwaghmare/apis";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../hooks";
export default function LoginPage({
  onSuccessRedirect,
}: {
  onSuccessRedirect: string;
}) {
  const navigate = useNavigate();
  const userContext = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { mutate: mutateLogin, isPending: loading } = useMutation<
    LoginResponseDto,
    Error,
    LoginUserDto
  >({
    mutationFn: async (body) => {
      const res = await api.authControllerLogin(body);
      return res.data;
    },
    onSuccess: (data) => {
      // Store some user info in localStorage for demo purposes
      userContext.setUser({
        userId: data.userId,
        email: data.email,
        name: data.name,
      });
      localStorage.setItem("user", JSON.stringify({ data }));
      navigate(onSuccessRedirect);
    },
    onError: () => {
      setError("Failed to login. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    mutateLogin({
      email,
      password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4 margin-auto w-max[700px]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your diary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
