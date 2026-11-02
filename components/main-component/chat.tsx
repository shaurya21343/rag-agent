import { useRef, useState, type ChangeEvent } from "react";
import { Bot, FileText, Paperclip, Send, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  parts?: { type: string; text?: string }[];
};

const Chat = ({ activeChatId }: { activeChatId: string | null }) => {
  const [input, setInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [messages] = useState<ChatMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoading = false;

  const removeFile = (fileToRemove: File) =>
    setSelectedFiles((files) => files.filter((file) => file !== fileToRemove));
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setSelectedFiles((currentFiles) => [...currentFiles, ...files]);
    event.target.value = "";
  };

  return (
    <>
      {/* Main Chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="shrink-0 border-b px-4 py-3 md:px-6">
          <p className="mx-auto max-w-3xl text-sm text-muted-foreground">
            Active chat: {activeChatId ?? "None"}
          </p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-8 md:px-6">

            {messages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">

                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Bot className="size-8 text-primary" />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  How can I help you today?
                </h2>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Start a conversation or upload a PDF document
                  to get started.
                </p>

                <div className="mt-8 grid w-full max-w-lg gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: "Summarize a document",
                      description: "Get key points from your PDF",
                    },
                    {
                      title: "Explain something",
                      description: "Understand complex topics",
                    },
                    {
                      title: "Analyze information",
                      description: "Explore your document",
                    },
                    {
                      title: "Ask a question",
                      description: "Get answers to your questions",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border p-4 text-left transition-colors hover:bg-muted/50"
                    >
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback>
                        {message.role === "user" ? "U" : "AI"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <p className="mb-2 text-sm font-semibold">
                        {message.role === "user" ? "You" : "Assistant"}
                      </p>

                      <div className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                        {message.parts?.map((part, index) =>
                          part.type === "text" ? (
                            <span key={index}>{part.text}</span>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Bot className="size-5" />
                    Thinking...
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="shrink-0 border-t bg-background px-4 py-4 md:px-6">
          <div className="mx-auto max-w-3xl">

            {/* Selected PDF */}
            {selectedFiles.length > 0 && (
              <div className="mb-3 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                    className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="size-5 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB · PDF
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file)}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-2xl border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring">

              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message AI..."
                className="min-h-16 resize-none border-0 bg-transparent px-4 py-3 shadow-none focus-visible:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    // No chat logic implemented.
                  }
                }}
              />

              <div className="flex items-center justify-between px-3 pb-3">

                <div className="flex items-center gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload PDF"
                    title="Upload PDF"
                  >
                    <Paperclip className="size-5" />
                  </Button>

                  <span className="text-xs text-muted-foreground">
                    PDF upload supported
                  </span>
                </div>

                <Button
                  size="icon"
                  disabled={!input.trim() && selectedFiles.length === 0}
                  aria-label="Send message"
                  title="Send message"
                >
                  <Send className="size-4" />
                </Button>

              </div>
            </div>

            <p className="mt-2 text-center text-xs text-muted-foreground">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>

      </main>
    </>
  );
};

export default Chat;