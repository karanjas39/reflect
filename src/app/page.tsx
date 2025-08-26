import { logoFont } from "@/lib/font";
import { cn } from "@/lib/utils";
import NewChatForm from "@/components/new-chat";

function HomePage() {
  return (
    <section className="space-y-4">
      <div className="space-y-2 text-center">
        <h1 className={cn("text-3xl text-primary", logoFont.className)}>
          Reflect.
        </h1>
        <p className="text-muted-foreground">
          We convert your thoughts into reality as this is what we do -
          Reflects.
        </p>
      </div>
      <NewChatForm />
    </section>
  );
}

export default HomePage;
