"use client";

import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme";
import { Toaster } from "react-hot-toast";

function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full px-3 py-2">
          <header className="fixed z-10">
            <SidebarTrigger />
          </header>
          {children}
        </main>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default RootProvider;
