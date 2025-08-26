/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { WandSparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { useChatStore } from "@/store/chat";
import { mockApiService, type GenerateImageRequest } from "@/lib/mock-api";
import toast from "react-hot-toast";

const formSchema = z.object({
  style: z.string().min(1, { message: "Please select a style." }),
  prompt: z.string().min(1, { message: "Please enter a prompt." }),
  image: z
    .instanceof(File)
    .refine(
      (file) => file && file.type.startsWith("image/"),
      "Please select a valid image file."
    ),
});

type FormData = z.infer<typeof formSchema>;

const styleOptions = [
  { value: "Editorial", label: "Editorial" },
  { value: "Streetwear", label: "Streetwear" },
  { value: "Vintage", label: "Vintage" },
];

export default function NewChatForm() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryInfo, setRetryInfo] = useState<{
    attempt: number;
    countdown: number;
    active: boolean;
  }>({ attempt: 0, countdown: 0, active: false });

  const { addChat, storageUsed, maxStorage } = useChatStore();

  useEffect(() => {
    if (!retryInfo.active || retryInfo.countdown <= 0) return;
    const interval = setInterval(() => {
      setRetryInfo((prev) => ({
        ...prev,
        countdown: prev.countdown > 1 ? prev.countdown - 1 : 0,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [retryInfo]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      style: "",
      prompt: "",
      image: undefined as any,
    },
  });

  const watchedStyle = form.watch("style");
  const watchedPrompt = form.watch("prompt");
  const isFormValid = watchedStyle && watchedPrompt && imageDataUrl;

  const handleImageSelect = (dataUrl: string, file: File) => {
    setImageDataUrl(dataUrl);
    form.setValue("image", file);
  };

  const handleImageRemove = () => {
    setImageDataUrl(null);
    form.setValue("image", undefined as any);
  };

  const handleAbort = () => {
    mockApiService.abort();
    resetFormState();
  };

  const resetFormState = () => {
    setIsLoading(false);
    setRetryInfo({ attempt: 0, countdown: 0, active: false });
    mockApiService.reset();
  };

  async function onSubmit(values: FormData) {
    if (!imageDataUrl) {
      toast.error("Please upload an image first");
      return;
    }

    try {
      setIsLoading(true);
      setRetryInfo({ attempt: 0, countdown: 0, active: false });

      const request: GenerateImageRequest = {
        imageDataUrl, // Use the data URL directly
        style: values.style,
        prompt: values.prompt,
      };

      const response = await mockApiService.generateImage(
        request,
        (attempt, delay) => {
          setRetryInfo({
            attempt,
            countdown: Math.ceil(delay / 1000),
            active: true,
          });
          toast.error(`Attempt ${attempt} of 3 failed. Retrying.`);
        }
      );

      const success = await addChat({
        id: response.id,
        imageDataUrl: response.imageDataUrl,
        prompt: response.prompt,
        style: response.style,
      });

      if (success) {
        toast.success("Image generated successfully!");
        form.reset();
        setImageDataUrl(null);
      } else {
        toast.error(
          "Storage limit reached. Please delete some of your thoughts."
        );
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image, please try again.");
    } finally {
      resetFormState();
    }
  }

  // Format storage size for display
  const formatStorageSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const storagePercentage = (storageUsed / maxStorage) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-10 p-4">
      {/* Storage Info */}
      <Card className="border-muted-foreground/20 bg-muted/10">
        <CardHeader>
          <CardTitle className="text-lg">Storage Usage</CardTitle>
          <CardDescription>Monitor your image storage usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Used:</span>
              <span className="text-sm text-muted-foreground">
                {formatStorageSize(storageUsed)} /{" "}
                {formatStorageSize(maxStorage)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  storagePercentage > 90
                    ? "bg-destructive"
                    : storagePercentage > 75
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {storagePercentage.toFixed(1)}% used
            </p>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormLabel className="text-base">Upload Image</FormLabel>
            <ImageUpload
              selectedImage={imageDataUrl}
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
            />
            <FormDescription>
              Upload the image where you want to see the changes.
            </FormDescription>
          </div>

          {/* Style Field */}
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Style</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {styleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the style of the image you want to see the changes in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Prompt Field */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your vision..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the changes you want to see in the image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Live Summary */}
          <Card className="border-dashed border-muted-foreground/20 bg-transparent">
            <CardHeader>
              <CardTitle>Live Summary</CardTitle>
              <CardDescription>
                This is a live summary of the image you are generating.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Image</Label>
                  <p className="text-sm">
                    {imageDataUrl ? (
                      <Badge variant="secondary">Image selected</Badge>
                    ) : (
                      <Badge>No image selected</Badge>
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Prompt
                  </Label>
                  <p className="text-sm">
                    {watchedPrompt || <Badge>No prompt entered</Badge>}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Style
                  </Label>
                  <p className="text-sm">
                    {watchedStyle || <Badge>No style selected</Badge>}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retry Status */}
          {retryInfo.active && (
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium">
                Attempt {retryInfo.attempt} of 3 failed. Retrying in{" "}
                {retryInfo.countdown} seconds.
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                You can abort the retry if needed.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center gap-3">
            <Button
              type="submit"
              disabled={!isFormValid}
              isLoading={isLoading}
              loadingText="Generating"
              className="flex-1 py-5 text-base"
            >
              <WandSparkles className="w-4 h-4 mr-2" />
              Generate
            </Button>

            {retryInfo.active && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAbort}
                className="px-6 py-5 text-base"
              >
                Abort
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
