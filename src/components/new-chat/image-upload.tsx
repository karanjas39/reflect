//here add img diable elsist rule

"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_DIMENSION = 1920;

interface ImageUploadProps {
  selectedImage: string | null;
  onImageSelect: (imageDataUrl: string, file: File) => void;
  onImageRemove: () => void;
}

export function ImageUpload({
  selectedImage,
  onImageSelect,
  onImageRemove,
}: ImageUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resizeImage = useCallback((file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();

      img.onload = () => {
        const { width, height } = img;
        let newWidth = width;
        let newHeight = height;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
          newWidth = Math.round(width * ratio);
          newHeight = Math.round(height * ratio);
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            }
          },
          file.type,
          0.9
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }, []);

  // Convert File to base64 data URL
  const convertFileToDataUrl = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file.type.match(/^image\/(png|jpe?g)$/)) {
        alert("Please select a PNG or JPG image.");
        return;
      }

      setIsProcessing(true);

      try {
        let processedFile = file;

        if (file.size >= MAX_FILE_SIZE) {
          processedFile = await resizeImage(file);
        } else {
          const img = new Image();
          img.onload = async () => {
            if (img.width > MAX_DIMENSION || img.height > MAX_DIMENSION) {
              processedFile = await resizeImage(file);
              setOriginalFile(processedFile);
              const imageDataUrl = await convertFileToDataUrl(processedFile);
              onImageSelect(imageDataUrl, processedFile);
            } else {
              setOriginalFile(file);
              const imageDataUrl = await convertFileToDataUrl(file);
              onImageSelect(imageDataUrl, file);
            }
            setIsProcessing(false);
          };
          img.src = URL.createObjectURL(file);
          return;
        }

        setOriginalFile(processedFile);
        const imageDataUrl = await convertFileToDataUrl(processedFile);
        onImageSelect(imageDataUrl, processedFile);
      } catch (error) {
        console.error("Error processing image:", error);
        alert("Error processing image. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    },
    [resizeImage, onImageSelect, convertFileToDataUrl]
  );

  const removeImage = useCallback(() => {
    setOriginalFile(null);
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onImageRemove]);

  return (
    <div className="w-full">
      {selectedImage ? (
        <div className="space-y-4">
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Uploaded preview"
              className="w-full h-48 md:h-64 object-contain rounded-lg bg-muted/50 border-2 border-border"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-4 right-4 shadow-lg"
              onClick={removeImage}
            >
              Remove
            </Button>
            {/* Metadata overlay on the image */}
            {originalFile && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-sm rounded-b-lg p-3 text-foreground">
                <div className="space-y-1">
                  <p className="font-medium text-sm truncate">
                    {originalFile.name}
                  </p>
                  <div className="flex items-center gap-0.5 text-xs">
                    <p>{Math.round(originalFile.size / 1024)}KB</p> -
                    <p>{originalFile.type.split("/")[1].toUpperCase()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-muted-foreground/30 rounded-lg transition-all duration-200 cursor-pointer hover:border-primary/50 hover:bg-muted/20"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="p-8 text-center space-y-6">
            <div
              className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                isProcessing
                  ? "bg-primary/20 text-primary"
                  : "bg-muted/20 text-muted-foreground hover:bg-primary/20 hover:text-primary hover:scale-105"
              }`}
            >
              {isProcessing ? (
                <Loader2 className="h-10 w-10 animate-spin" />
              ) : (
                <ImageIcon className="h-10 w-10" />
              )}
            </div>
            <div className="space-y-3">
              <p className="text-xl font-semibold text-primary">
                {isProcessing ? "Processing image..." : "Upload Image"}
              </p>
              <p className="text-muted-foreground">
                Click to select • PNG/JPG • Max 10MB
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge className="bg-primary/10 text-primary">PNG/JPG</Badge>
                <Badge className="bg-primary/10 text-primary">Max 10MB</Badge>
                <Badge className="bg-primary/10 text-primary">
                  Auto-resize To Max 1920px
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />
    </div>
  );
}
