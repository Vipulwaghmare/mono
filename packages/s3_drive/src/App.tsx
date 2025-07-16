"use client";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CredentialsForm from "./components/credentials-form";
import FileBrowser from "./components/file-browser";
import type { S3Credentials } from "./types/s3";

export default function App() {
  const [credentials, setCredentials] = useState<S3Credentials | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div>
        {/* Theme Toggle Button */}
        <button
          className="theme-toggle"
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <span title="Switch to light mode">🌞</span>
          ) : (
            <span title="Switch to dark mode">🌙</span>
          )}
        </button>
        <Routes>
          <Route
            path="/"
            element={
              credentials ? (
                <Navigate to="/browser" replace />
              ) : (
                <CredentialsForm onCredentialsSubmit={setCredentials} />
              )
            }
          />
          <Route
            path="/browser"
            element={
              credentials ? (
                <FileBrowser
                  credentials={credentials}
                  onLogout={() => setCredentials(null)}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
