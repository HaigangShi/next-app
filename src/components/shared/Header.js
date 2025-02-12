"use client"

import { useTheme } from "@/hooks";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-black/[.05] dark:hover:bg-white/[.05] transition-colors"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/[.1] dark:border-white/[.1] bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-semibold">Your App</div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
