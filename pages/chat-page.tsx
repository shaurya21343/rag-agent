
"use client";

import { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Paperclip,
  Send,
  FileText,
  X,
  Bot,
  Plus,
  Sparkles,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/main-component/side-bar";
import { useChatStore } from "@/store/chat/chat-store";
import Chat from "@/components/main-component/chat";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { activeChatId } = useChatStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // UI only: no backend or actual chat functionality.
  const { messages, status } = useChat({ id: activeChatId ?? undefined });

  const isLoading = status === "submitted" || status === "streaming";

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }

    event.target.value = "";
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="flex h-[100dvh] w-full bg-background">

      {/* Sidebar */}
        <SideBar />

      {/* Chat Area */}
      <Chat activeChatId={activeChatId} />
    </div>
  );
}
