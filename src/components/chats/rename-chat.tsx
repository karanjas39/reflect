"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatStore } from "@/store/chat";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Edit } from "lucide-react";

interface RenameChatProps {
  chatId: string;
  chatName: string;
}

function RenameChat({ chatId, chatName }: RenameChatProps) {
  const { renameChat } = useChatStore();
  const [newName, setNewName] = useState(chatName);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newName.trim() === chatName) {
      setIsOpen(false);
      return;
    }

    renameChat(chatId, newName.trim());
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem
        className="cursor-pointer"
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <Edit className="h-4 w-4" />
        Rename
      </DropdownMenuItem>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat</DialogTitle>
          <DialogDescription>Enter a new name for your chat.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter chat name"
              autoFocus
            />
          </div>
          <DialogFooter className="w-full gap-2">
            <Button type="submit" disabled={!newName.trim()} className="w-full">
              Rename chat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RenameChat;
