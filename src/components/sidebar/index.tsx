"use client";

import { Send } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { logoFont } from "@/lib/font";
import Chats from "./chats";

const navLinks = [
  {
    label: "New chat",
    href: "/",
    icon: Send,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <p className={cn("text-3xl px-2 pt-1", logoFont.className)}>Reflect.</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4 pl-2 mt-1">
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.label}>
                  <a href={link.href} className="flex items-center gap-2">
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </a>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* List of all chats */}
        <Chats />
      </SidebarContent>
    </Sidebar>
  );
}
