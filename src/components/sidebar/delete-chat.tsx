"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useState } from "react";
import { useChatStore } from "@/store/chat";
import { useRouter } from "next/navigation";

function DeleteChat({ chatId }: { chatId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteChat } = useChatStore();
  const router = useRouter();

  const handleDelete = () => {
    deleteChat(chatId);
    setIsOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem
        className="text-destructive focus:text-destructive"
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
        Delete
      </DropdownMenuItem>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the chat
            and remove all its messages.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteChat;
