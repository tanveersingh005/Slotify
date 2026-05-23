import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  LinkIcon, 
  Star, 
  CheckCircle,
  UserPlus,
  Settings,
  Share2,
  CheckCircle2
} from "lucide-react";
import TestimonialsCarousel from "@/components/testimonials";
import Link from "next/link";
import HeroInteractiveWidget from "@/components/hero-widget";
import ScrollReveal from "@/components/scroll-reveal";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    badge: "Automated",
    description: "Easily set up and customize your event types with specific durations, locations, and custom questions.",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    badge: "Flexible",
    description: "Define your working hours, connect multiple calendars, and configure custom buffers between sessions.",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    badge: "Shareable",
    description: "Share your personalized scheduling links directly via email, social profiles, or embed them on your website.",
  },
];

const howItWorks = [
  { 
    step: "Sign Up", 
    description: "Create your free Schedulrr account",
    icon: UserPlus
  },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
    icon: Settings
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
    icon: Share2
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
    icon: CheckCircle
  },
];

const Home = () => {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* 1. Dynamic Grid Background Pattern for Hero */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-[linear-gradient(to_right,#3b82f606_1px,transparent_1px),linear-gradient(to_bottom,#3b82f606_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none z-0" />

      {/* 2. Main Hero Container (Centered, expanded width, shifted upward closer to header) */}
      <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 xl:gap-24 2xl:gap-32">
          
          {/* Left Column: Premium Content & CTA (Made wider with larger text sizes) */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left space-y-7 sm:space-y-9 z-10">
            <ScrollReveal delay={0.1}>
              {/* Minimalist High-End Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100/80 dark:border-blue-900/30 shadow-sm transition-all duration-300 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006BFF] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  v1.2 Release: Premium Theming Active
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              {/* Stable, High-Contrast Typography (Enlarged to fill space) */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6.5xl md:text-7xl xl:text-8xl 2xl:text-[90px] font-black tracking-tight text-[#0f172a] dark:text-white leading-[1.05]">
                  Simplify Your <br />
                  <span className="text-[#006BFF] relative inline-block">
                    Scheduling
                  </span>
                </h1>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              {/* Description (Enlarged for readability) */}
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                Schedulrr helps you manage your time effectively. Create events, set your availability, and let others book time with you seamlessly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.55} className="w-full">
              {/* Buttons Row (Stable, professional brand styling) */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full">
                <Link href={"/dashboard"} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg font-bold bg-[#006BFF] hover:bg-[#0051C3] text-white shadow-md shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-0.5 rounded-xl px-9 py-6 h-auto">
                    Get Started 
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link href={"/book"} className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl px-9 py-6 h-auto transition-all duration-300 transform hover:-translate-y-0.5">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.7} className="w-full">
              {/* Social Proof ratings widget */}
              <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/40 flex items-center gap-5 w-full">
                <div className="flex -space-x-2.5">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                  ].map((src, i) => (
                    <div key={i} className="relative w-9.5 h-9.5 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-sm">
                      <Image src={src} alt={`User ${i}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-0.5">
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-current" />
                    ))}
                    <span className="text-xs font-bold text-slate-885 dark:text-slate-200 ml-1.5">4.9/5 Rating</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-450 mt-0.5">Trusted by over 10,000+ professionals worldwide</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: High-fidelity Interactive Simulation */}
          <div className="w-full lg:w-[48%] flex justify-center z-10 relative">
            <ScrollReveal delay={0.4} duration={0.8}>
              {/* Continuously animating premium semi-sharp vector shapes behind the card */}
              <div className="absolute -top-24 -left-20 w-[420px] h-[340px] rounded-t-[140px] rounded-b-[40px] bg-[#006BFF] dark:bg-[#3b82f6] opacity-[0.92] dark:opacity-[0.82] pointer-events-none -z-10 animate-float" />
              <div className="absolute -bottom-24 -right-16 w-[450px] h-[380px] rounded-br-[140px] rounded-tl-[80px] bg-[#df19c1] dark:bg-[#b01097] opacity-[0.88] dark:opacity-[0.78] pointer-events-none -z-10 animate-float-delayed rotate-[12deg]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-400/10 blur-[85px] dark:bg-cyan-550/5 pointer-events-none -z-10 animate-pulse-glow" />
              
              <div className="relative z-10 w-full flex justify-center">
                <HeroInteractiveWidget />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* 3. Key Features Section */}
      <ScrollReveal delay={0.15}>
        <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32 relative z-10">
          
          {/* Subtle Ambient Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-500/5 dark:bg-blue-500/[0.02] blur-[120px] pointer-events-none -z-10 rounded-full" />

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-3">Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Key Features for Seamless Booking
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Everything you need to handle appointments, sync calendars, and automate reminders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 xl:gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover:shadow-2xl hover:shadow-blue-500/[0.04] dark:hover:shadow-black/30 border border-slate-100 hover:border-blue-400/30 dark:border-slate-800/80 dark:hover:border-blue-500/20 transition-all duration-300 group hover:-translate-y-1.5 rounded-2xl overflow-hidden flex flex-col justify-between p-1">
                <CardHeader className="pb-4">
                  {/* Badge & Category */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[9px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/15 px-3 py-1 rounded-full uppercase tracking-widest">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Polished Circular Frame for Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50/50 to-indigo-50/20 dark:from-slate-900/60 dark:to-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-blue-500/20 group-hover:shadow-sm transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                  </div>

                  <CardTitle className="text-xl font-bold text-slate-850 dark:text-slate-100 tracking-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 flex flex-col h-full justify-between">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Subtle Action Link */}
                  <div className="pt-4 border-t border-slate-100/60 dark:border-slate-800/40 mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-750 dark:hover:text-blue-350 cursor-pointer">
                      Explore Feature 
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Testimonials Section */}
      <ScrollReveal delay={0.2}>
        <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-3">Feedback</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              What Our Users Say
            </h3>
          </div>
          <div className="bg-slate-50/40 dark:bg-slate-900/20 rounded-3xl p-6 sm:p-10 border border-slate-200/50 dark:border-slate-800/60 shadow-sm backdrop-blur-sm relative overflow-hidden">
            
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-500/[0.01] blur-[80px] pointer-events-none" />

            <TestimonialsCarousel />
          </div>
        </div>
      </ScrollReveal>

      {/* 5. How It Works Section */}
      <ScrollReveal delay={0.2}>
        <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-extrabold text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-3">Workflow</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              How It Works
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            
            {/* Pulsing Connector Line in Background for large displays */}
            <div className="hidden lg:block absolute top-10 left-16 right-16 h-[2px] bg-gradient-to-r from-blue-500/10 via-indigo-500/20 to-cyan-500/10 z-0" />

            {howItWorks.map((step, index) => (
              <div key={index} className="text-center space-y-5 group z-10 relative">
                
                {/* Organic Circular Steps with Icons */}
                <div className="bg-white dark:bg-[#090d16] border border-slate-200/50 dark:border-slate-800/80 shadow-md rounded-2xl w-20 h-20 flex items-center justify-center mx-auto relative transition-all duration-300 group-hover:scale-105 group-hover:border-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/[0.04]">
                  
                  {/* Floating Step Number Badge */}
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-[11px] flex items-center justify-center absolute -top-2 -right-2 border-2 border-white dark:border-[#090d16] shadow-sm select-none">
                    {index + 1}
                  </span>

                  <step.icon className="w-7 h-7 text-blue-600 dark:text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                <h3 className="font-extrabold text-base text-slate-850 dark:text-slate-100 tracking-tight">{step.step}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold max-w-[210px] mx-auto leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 6. CTA Section */}
      <ScrollReveal delay={0.2}>
        <div className="max-w-[1580px] mx-auto px-4 mb-24 relative z-10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-750 dark:from-[#090d16] dark:to-[#05080f] border border-blue-500/10 dark:border-slate-800/80 p-12 sm:p-16 md:p-20 text-center shadow-xl">
            
            {/* Visual glow decorators inside banner */}
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
            
            <div className="relative max-w-3xl mx-auto space-y-6 z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Simplify Your Scheduling?
              </h2>
              <p className="text-blue-100 dark:text-slate-350 text-sm sm:text-base font-semibold max-w-xl mx-auto leading-relaxed">
                Join thousands of professionals who trust Schedulrr to automate their booking workflows and optimize their daily calendars.
              </p>
              
              <div className="pt-4">
                <Link href={"/dashboard"}>
                  <Button size="lg" className="bg-white dark:bg-blue-600 text-blue-600 dark:text-white hover:bg-slate-50 dark:hover:bg-blue-500 font-bold hover:scale-[1.03] active:scale-95 transition-transform px-9 py-6 h-auto text-base sm:text-lg shadow-md rounded-xl">
                    Start For Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* High-End Trust Indicators */}
              <div className="pt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-blue-100 dark:text-slate-400 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant 1-minute setup</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Connects with Google & Outlook</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
};

export default Home;
