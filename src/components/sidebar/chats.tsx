import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { EllipsisVertical, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenameChat from "./rename-chat";
import { useChatStore } from "@/store/chat";
import DeleteChat from "./delete-chat";
import { useMemo } from "react";

function Chats() {
  const { chats } = useChatStore();
  const pathname = usePathname();

  const sortedChats = useMemo(() => {
    return chats.slice().sort((a, b) => b.createdAt - a.createdAt);
  }, [chats]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base text-muted-foreground">
        <List className="w-4 h-4 mr-2" /> Chats
      </SidebarGroupLabel>
      {sortedChats.length > 0 ? (
        <SidebarGroupContent>
          <SidebarMenu className="gap-1 mt-1">
            {sortedChats.map((chat) => (
              <SidebarMenuItem
                key={chat.id}
                className={cn(
                  "px-3 py-1.5 rounded-xl",
                  pathname === `/chat/${chat.id}` && "bg-primary/10"
                )}
              >
                <div className="flex items-center w-full group">
                  <Link
                    href={`/chat/${chat.id}`}
                    className="flex-1 min-w-0 transition-colors cursor-pointer"
                  >
                    <span className="block truncate">{chat.prompt}</span>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-2 flex-shrink-0"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <EllipsisVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <RenameChat chatId={chat.id} chatName={chat.prompt} />
                      <DeleteChat chatId={chat.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      ) : (
        <p className="text-muted-foreground text-sm pl-2 italic">
          No chats yet.
        </p>
      )}
    </SidebarGroup>
  );
}

export default Chats;
