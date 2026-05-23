import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import UserMenu from "./user-menu";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import ThemeToggle from "./theme-toggle";

async function Header() {
  await checkUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/60 dark:bg-slate-950/70">
      <nav className="mx-auto max-w-[1580px] py-3 px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Image
            src="/logo.png"
            width="150"
            height="60"
            alt="Schedulrr Logo"
            className="h-12 w-auto dark:invert transition-all duration-300"
          />
        </Link>

        <div className="flex items-center gap-3.5">
          <Link href="/book" className="hidden sm:block text-sm font-semibold text-slate-650 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-primary mr-2">
            Book a Session
          </Link>
          
          <ThemeToggle />

          <Link href="/events?create=true">
            <Button variant="default" className="flex items-center gap-2 shadow-sm font-semibold hover:scale-[1.02] transition-transform text-xs py-2 h-9">
              <PenBox size={14} />
              <span className="hidden sm:inline">Create Event</span>
            </Button>
          </Link>
          
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs py-2 h-9">Login</Button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;
