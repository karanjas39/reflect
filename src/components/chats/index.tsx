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
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenameChat from "./rename-chat";
import { useChatStore } from "@/store/chat";
import DeleteChat from "./delete-chat";

function Chats() {
  const { chats } = useChatStore();
  const pathname = usePathname();

  return (
    <>
      {chats?.length ? (
        <SidebarGroup>
          <SidebarGroupLabel className="text-base text-muted-foreground">
            Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 mt-1">
              {chats.map((chat) => (
                <SidebarMenuItem
                  key={chat.id}
                  className={cn(
                    "p-3 rounded-xl",
                    pathname === `/chat/${chat.id}` && "bg-primary/10"
                  )}
                >
                  <div className="flex items-center w-full group">
                    <Link
                      href={`/chat/${chat.id}`}
                      className="flex-1 min-w-0 transition-colors cursor-pointer"
                    >
                      <span className="block truncate">{chat.name}</span>
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
                        <RenameChat chatId={chat.id} chatName={chat.name} />
                        <DeleteChat chatId={chat.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ) : null}
    </>
  );
}

export default Chats;
