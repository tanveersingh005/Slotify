"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Shield, CheckCircle2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Enterprise", href: "#" },
  ];

  const solutionsLinks = [
    { label: "For Sales", href: "#" },
    { label: "For Marketing", href: "#" },
    { label: "For Recruitment", href: "#" },
    { label: "For Startups", href: "#" },
  ];

  const trustLinks = [
    { label: "Security Hub", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Status Page", href: "#" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-[#060a13] border-t border-slate-200/50 dark:border-slate-800/40 relative z-10 transition-colors duration-300">
      
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent pointer-events-none" />

      <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-slate-200/60 dark:border-slate-800/40">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-850 dark:text-white">
                Schedul<span className="text-blue-600 dark:text-blue-500">rr</span>
              </span>
            </Link>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
              Simplifying meeting scheduling so you and your team can focus on what matters most. Automate invitations, sync calendars, and eliminate the back-and-forth.
            </p>

            {/* Social Icons Grid */}
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 flex items-center justify-center text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 hover:border-blue-500/20 dark:hover:border-blue-500/20 hover:scale-105 active:scale-95 shadow-sm transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-850 dark:text-slate-250 uppercase tracking-widest">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 text-sm font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-850 dark:text-slate-250 uppercase tracking-widest">
              Solutions
            </h4>
            <ul className="space-y-3">
              {solutionsLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 text-sm font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Trust & Compliance */}
          <div className="space-y-5">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-850 dark:text-slate-250 uppercase tracking-widest">
                Trust & Support
              </h4>
              <ul className="space-y-3">
                {trustLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 text-sm font-medium transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* High-End Compliance Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15 dark:border-emerald-500/20 text-emerald-650 dark:text-emerald-450 shadow-sm pointer-events-none">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                SOC2 Type II & GDPR
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & author credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-400 dark:text-slate-550 text-xs font-semibold">
            &copy; {currentYear} Schedulrr Inc. All rights reserved.
          </p>

          {/* Beautiful Tanveer Credit Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold flex items-center gap-1">
              Made with <span className="text-rose-500 animate-pulse">💗</span> by <span className="font-extrabold text-slate-700 dark:text-slate-200">Tanveer Singh</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
