import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { useGetUser } from "@vipulwaghmare/auth-frontend";
import { authApi } from "../apis/instance";

const getInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export default function DashboardHeader() {
  const user = useGetUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authApi.authControllerLogout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <h1 className="text-xl font-bold">MyDiary</h1>
        </Link>

        <div className="hidden md:flex items-center gap-6 ml-6">
          <Link to="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
          {/* <Link
            to="/dashboard/entries"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            All Entries
          </Link> */}
          {/* <Link
            to="/dashboard/calendar"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Calendar
          </Link> */}
          <Link
            to="/dashboard/memento-mori"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Memento Mori
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || ""}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link to="/dashboard" className="flex items-center gap-2 mb-6">
                <h1 className="text-xl font-bold">MyDiary</h1>
              </Link>
              <div className="grid gap-4">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {/* <Link
                  to="/dashboard/entries"
                  className="text-sm font-medium text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Entries
                </Link> */}
                {/* <Link
                  to="/dashboard/calendar"
                  className="text-sm font-medium text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Calendar
                </Link> */}
                <Link
                  to="/dashboard/memento-mori"
                  className="text-sm font-medium text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Memento Mori
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
