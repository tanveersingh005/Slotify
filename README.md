# Schedulrr — Next-Gen Modern Scheduling Platform

![Schedulrr Hero Section](/Screenshot.png)

Schedulrr is a premium, high-fidelity scheduling application (a Calendly clone) built with Next.js 14, Tailwind CSS, Prisma, and Clerk. It features an obsidian-slate visual design, an interactive scheduling simulator, Apple/Stripe-inspired scroll reveal animations, a client-side Light/Dark theme engine, and a companion Chrome Extension helper.

## ✨ Core Features

*   **🌓 Unified Theme Engine**: Refined class-based Light and Dark modes utilizing professional obsidian-slate (`#020617`) and vivid cobalt (`#006BFF`) palettes with hardware-accelerated Sun/Moon toggling transitions.
*   **🏢 Spacious & Fluid Dashboards**: Theme-adaptive admin interface including sidebars and bottom navigation layers, upcoming meetings grids, and unique URL username configurations.
*   **📅 Interactive Scheduling Double-Pane**: High-trust split double-pane card combining event listings and DayPicker calendars with custom CSS-variable highlighting for open date slots.
*   **🔒 Clerk Security Integration**: Premium login overlays, secure user sessions, and database user creations handled cleanly via Clerk Webhooks.
*   **📦 Dynamic Event Management**: Create, edit, and delete event types (e.g. 15-minute quick call, 30-minute discovery) with real-time public/private status badges.
*   **⏳ Buffered Availability Planner**: Dynamic weekly schedule planners featuring arrow-linked start/end time selectors and buffer gap configurations.
*   **🔗 Unified Meet Invites**: Integrated Google Meet video invitation generators with instant success checklists upon booking confirmations.
*   **🌊 Apple/Stripe-Style Scroll Reveals**: Seamless `IntersectionObserver` scroll slide-in animations triggering cascading card reveals.
*   **🔌 Manifest V3 Chrome Extension**: High-end companion browser extension to view your active meeting slots and copy invite links in one click with toast notifications.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 14 (App Router, Server Actions, Server Components)
*   **Database**: Neon Serverless PostgreSQL
*   **ORM**: Prisma Client
*   **Authentication**: Clerk Auth Service
*   **Forms**: React Hook Form with Zod validation
*   **Styles**: Tailwind CSS with Tailwind Animate & Lucide React Icons
*   **Date Utilities**: Date-Fns & React Day Picker

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <your-repository-url>
cd calendly-clone
npm install


# 2.Configure Environment Variables
Create a .env file in the root directory and define the following variables:

DATABASE_URL="postgresql://<user>:<password>@<host>-pooler.<region>.aws.neon.tech/<database>?sslmode=require"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

## 3. Initialize Prisma Database Schemas
Generate the Prisma client and push your relational schema models to your serverless PostgreSQL database:
npx prisma generate
npx prisma db push

## 4. Run Development Server
npm run dev

Companion Browser Extension Setup
To load Schedulrr's helper extension:

1.Open Google Chrome and go to chrome://extensions/.
2.Turn on Developer mode in the top-right corner.
3.Click the Load unpacked button in the top-left.
4.Select the extension/ folder located in Schedulrr's repository root.
5.Schedulrr's calendar icon will appear on your Chrome toolbar, ready for one-click scheduling!