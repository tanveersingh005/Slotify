"use client";

import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full border border-slate-200/60 bg-white/50 text-slate-700 backdrop-blur-md transition-all hover:bg-slate-100/80 hover:text-slate-900 dark:border-slate-800/60 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-850 dark:hover:text-slate-100"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
