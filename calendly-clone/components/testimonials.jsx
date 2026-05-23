"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content:
      "Schedulrr has transformed how I manage my team's meetings. It's intuitive, saves us hours every week, and the timezone handling is flawless!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "David Lee",
    role: "Freelance Designer",
    content:
      "As a freelancer, Schedulrr helps me stay organized and professional. My clients love how easy it is to book time with me without email back-and-forth.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Emily Chen",
    role: "Startup Founder",
    content:
      "Schedulrr streamlined our hiring process. Setting up panel interviews and syncing with multiple calendars has never been easier!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Michael Brown",
    role: "Sales Executive",
    content:
      "I've seen a 30% increase in my meeting bookings since using Schedulrr. It's a total game-changer for outbound sales professionals.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  },
];

const TestimonialsCarousel = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full px-4 md:px-10 group/carousel">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4500,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full mx-auto"
      >
        <CarouselContent className="-ml-6">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
              <Card className="glass-card hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-black/30 border border-slate-100/80 hover:border-blue-400/40 dark:border-slate-800/80 dark:hover:border-blue-500/30 transition-all duration-300 h-full rounded-2xl overflow-hidden relative">
                <CardContent className="flex flex-col justify-between h-full p-8 space-y-6 relative z-10">
                  
                  {/* Premium Quote Mark Decorator */}
                  <div className="absolute top-6 right-6 text-slate-100 dark:text-slate-900 pointer-events-none transition-colors duration-300 group-hover:text-blue-550/10">
                    <Quote className="w-10 h-10 fill-current opacity-80" />
                  </div>

                  <div className="space-y-4">
                    {/* Testimonial Star Review Group */}
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4.5 h-4.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed italic relative z-10">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>

                  <div className="flex items-center pt-5 border-t border-slate-100 dark:border-slate-800/60">
                    {/* Enhanced Avatar with Double Ring */}
                    <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-blue-500/10 to-indigo-500/30 dark:from-blue-500/20 dark:to-indigo-500/40 mr-3">
                      <Avatar className="h-11 w-11 border-2 border-white dark:border-slate-900 shadow-md">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-blue-500/10 text-primary text-xs font-bold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-850 dark:text-slate-100 leading-none mb-1">{testimonial.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-450 uppercase tracking-wider leading-none">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Minimalist Floating Controls - Visible on desktop, subtle hover fade in */}
        <div className="hidden md:block">
          <CarouselPrevious className="absolute -left-4 xl:-left-8 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-850 shadow-md h-10 w-10 text-slate-750 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 pointer-events-auto" />
          <CarouselNext className="absolute -right-4 xl:-right-8 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-850 shadow-md h-10 w-10 text-slate-750 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 pointer-events-auto" />
        </div>
      </Carousel>

      {/* Dynamic Embla Progress Pagination Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 ease-out",
                current === index
                  ? "w-7 bg-blue-600 dark:bg-blue-500"
                  : "w-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-350 dark:hover:bg-slate-700"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
