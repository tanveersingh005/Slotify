import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CreateEventDrawer from "@/components/create-event";
import { ThemeProvider } from "@/components/theme-provider";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

export const metadata = {
  title: "Schedulrr",
  description: " ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jakarta.className}>
          <ThemeProvider>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
              {children}
            </main>
            <Footer />
            <CreateEventDrawer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
