
"use client";

import { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/store/chat/chat-store";
import Chat from "@/components/main-component/chat";
import dynamic from 'next/dynamic'
const SideBar = dynamic(() => import('@/components/main-component/side-bar'), {
  ssr: false,
})

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
