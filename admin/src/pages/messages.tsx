import { useState } from "react";
import { Mail, Trash2, CornerDownRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  read: boolean;
  reply: string | null;
  createdAt: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const STATIC_MESSAGES: Message[] = [
  {
    id: "1",
    senderName: "Alice Dupont",
    senderEmail: "alice@example.com",
    subject: "Freelance opportunity",
    body: "Hello,\n\nI came across your portfolio and I'm impressed by your work. We're looking for a freelance developer for a 3-month project. Would you be interested in discussing further?\n\nBest regards,\nAlice",
    read: false,
    reply: null,
    createdAt: "2026-03-28T10:32:00Z",
  },
  {
    id: "2",
    senderName: "Bob Martin",
    senderEmail: "bob.martin@agency.io",
    subject: "Collaboration on a SaaS project",
    body: "Hi,\n\nWe're building a SaaS platform and need a strong frontend developer. Your skills in React and TypeScript look like a perfect fit. Let me know if you'd like to hop on a call.\n\nCheers,\nBob",
    read: false,
    reply: null,
    createdAt: "2026-03-27T14:15:00Z",
  },
  {
    id: "3",
    senderName: "Clara Schmidt",
    senderEmail: "clara@startup.de",
    subject: "Your portfolio is amazing!",
    body: "Hey,\n\nJust wanted to say your portfolio design is really clean and inspiring. Did you build it yourself? Would love to know your stack.\n\nClara",
    read: true,
    reply: "Thanks Clara! Yes, built it with React, Vite and TailwindCSS. Happy to share more details if you're curious.",
    createdAt: "2026-03-25T09:00:00Z",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Messages() {
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>(STATIC_MESSAGES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const selectedMessage = messages.find((m) => m.id === selectedId) ?? null;

  const handleSelect = (msg: Message) => {
    setSelectedId(msg.id);
    if (!msg.read) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    }
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm("Delete this message permanently?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
    toast({ title: "Message deleted" });
  };

  const handleReply = () => {
    if (!selectedId || !replyText.trim()) return;
    setMessages((prev) =>
      prev.map((m) => (m.id === selectedId ? { ...m, reply: replyText } : m))
    );
    toast({ title: "Reply saved" });
    setReplyText("");
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="h-full flex flex-col pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Inbox</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Manage communication from your portfolio.
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 overflow-hidden">
        {/* List */}
        <div className={`w-full md:w-1/3 flex flex-col bg-card border border-card-border rounded-2xl overflow-hidden shadow-lg shadow-black/5 ${selectedId ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-border bg-secondary/50">
            <h3 className="font-semibold flex items-center gap-2">
              <Mail size={16} /> All Messages
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">No messages yet.</div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    selectedId === msg.id
                      ? "bg-primary/10 border-primary/30 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex items-center gap-2 overflow-hidden">
                      {!msg.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      <span className={`text-sm truncate ${!msg.read ? "font-bold text-foreground" : "font-medium text-foreground/80"}`}>
                        {msg.senderName}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-xs truncate mb-1 ${!msg.read ? "font-medium text-foreground/90" : "text-muted-foreground"}`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-muted-foreground/60 line-clamp-1">{msg.body}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detail */}
        <div className={`w-full md:w-2/3 flex-col bg-card border border-card-border rounded-2xl overflow-hidden shadow-lg shadow-black/5 ${selectedId ? "flex" : "hidden md:flex"}`}>
          {selectedMessage ? (
            <>
              {/* Detail header */}
              <div className="p-4 md:p-6 border-b border-border bg-secondary/30 flex justify-between items-start">
                <div className="flex gap-4">
                  <button onClick={() => setSelectedId(null)} className="md:hidden mt-1 text-muted-foreground">
                    <X size={20} />
                  </button>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl shrink-0">
                    {selectedMessage.senderName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display text-foreground leading-tight">{selectedMessage.subject}</h2>
                    <p className="text-sm font-medium mt-1">
                      {selectedMessage.senderName}{" "}
                      <span className="text-muted-foreground font-normal">&lt;{selectedMessage.senderEmail}&gt;</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(selectedMessage.id, e)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="prose dark:prose-invert max-w-none text-sm md:text-base whitespace-pre-wrap text-foreground/90">
                  {selectedMessage.body}
                </div>

                {selectedMessage.reply && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 relative">
                      <div className="absolute -top-3 left-4 bg-card px-2 text-xs font-bold text-primary flex items-center gap-1">
                        <CornerDownRight size={14} /> Your Reply
                      </div>
                      <p className="text-sm text-foreground/80 whitespace-pre-wrap">{selectedMessage.reply}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Reply box */}
              {!selectedMessage.reply && (
                <div className="p-4 md:p-6 border-t border-border bg-secondary/20">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Draft Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    placeholder="Type your response here..."
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none mb-3"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim()}
                      className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
                    >
                      Save & Mark Replied
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
              <Mail size={64} className="opacity-20 mb-4" />
              <p className="font-medium">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}