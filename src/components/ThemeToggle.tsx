
import { useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = window.localStorage.getItem("theme");
    if (stored) return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme class to html
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-background/80 dark:bg-background/40 border border-gray-200 dark:border-gray-700 p-2 rounded-full shadow hover:scale-110 transition-transform"
    >
      {theme === "dark" ? (
        <ToggleLeft size={28} className="text-yellow-400" />
      ) : (
        <ToggleRight size={28} className="text-purple-500" />
      )}
    </button>
  );
}
