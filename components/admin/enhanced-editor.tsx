"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RiRobot2Fill } from "react-icons/ri";
import { toast } from "@/components/ui/use-toast";

// Dynamically import TinyMCE to avoid SSR issues
const TinyMCEEditor = dynamic(
  () => import('@tinymce/tinymce-react').then(mod => mod.Editor),
  { 
    ssr: false,
    loading: () => <p>Loading editor...</p>
  }
);

interface EnhancedEditorProps {
  value: string;
  onChange: (value: string) => void;
  fieldName?: string;
  className?: string;
  height?: number;
}

export const EnhancedEditor: React.FC<EnhancedEditorProps> = ({
  value,
  onChange,
  fieldName,
  className,
  height = 300,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSourceView, setIsSourceView] = useState(false);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

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

    // Set up AbortController with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30000); // 30-second timeout

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInput: `You are a professional content enhancer specializing in CV and resume content. 
Your task is to improve the provided ${fieldName || "text"} to make it more professional, concise, and impactful.
Keep the same meaning but enhance the wording and structure. Format appropriately with bullet points if it's a list of accomplishments.
Respond with ONLY the improved text without any explanations or additional text.`,
          data: value,
          creativity: 0.3
        }),
        signal: controller.signal
      });

      // Clear the timeout since the request completed
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(
          errorText ||
            `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data || typeof data.response !== "string") {
        throw new Error("Invalid response format from AI service");
      }

      onChange(data.response);

      toast({
        title: "Content enhanced",
        description: "AI has enhanced your content."
      });
    } catch (error) {
      console.error("AI Enhancement error:", error);

      // Clear the timeout to prevent memory leaks
      clearTimeout(timeoutId);

      let errorMessage = "Failed to enhance content with AI";

      if (error instanceof DOMException && error.name === "AbortError") {
        errorMessage = "Request timed out. Please try again later.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (    
  <div className={`relative ${className || ''}`}>
    <TinyMCEEditor
        value={value}
        onEditorChange={handleEditorChange}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        init={{
          height,
          menubar: false,          plugins: 'lists advlist link image code table fullscreen searchreplace',
          toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | list-style | link image table | code fullscreen',
          advlist_bullet_styles: 'default,circle,disc,square,dash',
          content_style: 'body { font-family: Inter, -apple-system, system-ui, sans-serif; font-size: 14px; }',
          placeholder: `Enter ${fieldName || 'content'} here...`,
          branding: false,
          promotion: false,
          statusbar: true,
          elementpath: false,
          setup: (editor: any) => {
            editor.on('focus', () => {
              setIsSourceView(false);
            });
            editor.on('init', () => {
              editor.getBody().setAttribute('contenteditable', 'true');
            });
          }
        }}
      />      <Button
        variant="outline"
        size="sm"
        className="absolute top-14 right-2 gap-2 z-50 border-bolder-gray-500 hover:border-gray-400"
        onClick={handleAIClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RiRobot2Fill className="h-4 w-4" />
        )}
        Enhance with AI
      </Button>
    </div>
  );
};
