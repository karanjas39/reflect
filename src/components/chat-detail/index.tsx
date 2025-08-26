"use client";

import { useChatStore } from "@/store/chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Simple date formatting function
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

function ChatDetails({ chatId }: { chatId: string }) {
  const { chats } = useChatStore();
  const chat = chats.find((chat) => chat.id === chatId);

  if (!chat) {
    return (
      <div className="text-center text-muted-foreground italic">
        Chat not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Chat Details */}
      <div className="grid gap-6">
        {/* Image Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              {chat.imageDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={chat.imageDataUrl}
                  alt="Generated artwork"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: "400px" }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">
                    No image found for this thought
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Prompt Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">{chat.prompt}</p>
          </CardContent>
        </Card>

        {/* Style Section */}
        <Card>
          <CardHeader>
            <CardTitle>Art Style</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="px-4 py-2">
              {chat.style}
            </Badge>
          </CardContent>
        </Card>

        {/* Metadata Section */}
        <Card>
          <CardHeader>
            <CardTitle>Meta Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Chat ID:</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {chat.id}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Created:</span>
                <span className="text-muted-foreground">
                  {formatDate(chat.createdAt)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Last Updated:</span>
                <span className="text-muted-foreground">
                  {formatDate(chat.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ChatDetails;
