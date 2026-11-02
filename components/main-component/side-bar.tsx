"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sparkles,  MessageSquare, Plus } from 'lucide-react';
import React from "react";
import { useChatStore } from "@/store/chat/chat-store"

const SideBar = () => {
  const { isLoaded, user } = useUser();
  const [chats, setChats] = React.useState<Array<{ _id: string; chatName: string }>>([]);
  const displayName = user?.fullName ?? user?.username ?? "User";
  const email = user?.primaryEmailAddress?.emailAddress;
  const { activeChatId, setActiveChatId } = useChatStore();

  const handleNewChat = async () => {
    const chatName = window.prompt("Enter a name for your chat:");
    if (!chatName?.trim()) return;

    try {
      await fetch("/api/chat/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatName: chatName.trim() }),
      });
      await getAllChats();
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const getAllChats = async () => {
    try {
      const response = await fetch("/api/chat/get-all-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }
      const data = await response.json();
      setChats(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }
  React.useEffect(() => {
    getAllChats();
  }, []);
    
  return (
    <div>
          <aside className="hidden h-screen w-64 shrink-0 flex-col border-r bg-muted/20 md:flex">

        <div className="flex h-16 items-center gap-2 px-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </div>
          <span className="text-lg font-semibold">AI Chat</span>
        </div>

        <div className="px-3 py-4">
          <Button className="w-full justify-start gap-2" onClick={handleNewChat}>
            <Plus className="size-4" />
            New Chat
          </Button>
        </div>

        <Separator />

        <div className="p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Chats
          </p>

          <div className="space-y-1">
            {chats.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">No conversations yet</p>
            ) : (
              chats.map((chat) => (
                <button
                  key={chat._id}
                  type="button"
                  onClick={() => setActiveChatId(chat._id)}
                  aria-pressed={activeChatId === chat._id}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ${
                    activeChatId === chat._id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <MessageSquare className="size-4 shrink-0" />
                  <span className="truncate">{chat.chatName}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="mt-auto p-4">
          <Separator className="mb-4" />
          <div className="flex items-center gap-3">
            <UserButton />
            <div>
              <p className="text-sm font-medium">{isLoaded ? displayName : "Loading..."}</p>
              <p className="text-xs text-muted-foreground">{email ?? "Personal account"}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default SideBar