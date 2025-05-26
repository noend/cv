"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RiRobot2Fill } from "react-icons/ri";
import { toast } from "@/components/ui/use-toast";

interface AIEnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
  fieldName?: string;
}

export const AIEnhancedInput = React.forwardRef<
  HTMLInputElement,
  AIEnhancedInputProps
>(({ className, onValueChange, fieldName, value, onChange, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAIClick = async () => {
    if (!value) {
      toast({
        title: "No content to enhance",
        description: "Please add some content to enhance with AI.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInput: `You are a professional content enhancer specializing in CV and resume content. 
Your task is to improve the provided ${fieldName ||
            "text"} to make it more professional, concise, and impactful.
Keep the same meaning but enhance the wording. Respond with ONLY the improved text without any explanations or additional text.`,
          data: String(value),
          creativity: 0.3
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI suggestions");
      }

      // Call the parent's onChange handler with a synthetic event
      if (onChange) {
        const syntheticEvent = {
          target: {
            value: data.response,
            name: props.name
          }
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
      }

      // Also call the onValueChange callback if provided
      if (onValueChange) {
        onValueChange(data.response);
      }

      toast({
        title: "Content enhanced",
        description: "AI has enhanced your content."
      });
    } catch (error) {
      console.error("AI Enhancement error:", error);
      toast({
        title: "Enhancement failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to enhance content with AI",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex w-full">
      <Input
        className={className}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 rounded-l-none h-full"
        onClick={handleAIClick}
        disabled={isLoading}
      >
        {isLoading
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : <RiRobot2Fill className="h-4 w-4" />}
      </Button>
    </div>
  );
});

AIEnhancedInput.displayName = "AIEnhancedInput";
