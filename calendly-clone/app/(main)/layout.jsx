"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, BarChart, Users, Clock } from "lucide-react";
import { BarLoader } from "react-spinners";
import { useUser } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { isLoaded } = useUser();

  return (
    <>
      {!isLoaded && <BarLoader width={"100%"} color="#3b82f6" />}
      <div className="flex flex-col h-[calc(100vh-65px)] bg-slate-50 dark:bg-slate-950/20 md:flex-row transition-colors duration-300">
        {/* Sidebar for medium screens and up */}
        <aside className="hidden md:block w-64 border-r border-slate-200/50 bg-white dark:border-slate-800/50 dark:bg-slate-900/60 transition-colors duration-300">
          <nav className="mt-8">
            <ul className="space-y-1.5 px-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/30"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? "text-primary" : "text-slate-400 dark:text-slate-500"}`} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-20 md:pb-8">
          <header className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-900/60 pb-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-650 to-cyan-500 bg-clip-text text-transparent w-full text-left">
              {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </h2>
          </header>
          {children}
        </main>

        {/* Bottom tabs for small screens */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 border-t border-slate-200/60 backdrop-blur-md dark:bg-slate-900/90 dark:border-slate-800/60 shadow-lg z-40 transition-colors duration-300">
          <ul className="flex justify-around py-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="flex-1">
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center py-2 px-1 text-center transition-all duration-200 ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[10px] mt-1">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
