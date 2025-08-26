import ChatDetails from "@/components/chat-detail";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoFont } from "@/lib/font";

export const generateMetadata = async () => {
  return {
    title: "Reflect - Thought shared with Reflect",
    description:
      "This is one of your thoughts that you have shared with Reflect.",
  };
};

async function ChatDetail({ params }: { params: Promise<{ chatid: string }> }) {
  const { chatid } = await params;

  if (!chatid) redirect("/");

  return (
    <section className="space-y-4">
      <div className="space-y-2 text-center">
        <h1 className={cn("text-3xl text-primary", logoFont.className)}>
          Reflect.
        </h1>
        <p className="text-muted-foreground">Thought shared with Reflect</p>
      </div>
      <ChatDetails chatId={chatid} />
    </section>
  );
}

export default ChatDetail;
