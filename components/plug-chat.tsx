"use client";

import { SendIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import HudLabel from "./hud/hud-label";
import { getPlugReply } from "./plug-responses";

const TYPING_DELAY_MS = 700;

type Message = {
  sender: "bot" | "user";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  { sender: "bot", text: "How may I assist you" },
];

type Props = {
  onClose: () => void;
};

function PlugChat({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: getPlugReply(trimmed) },
      ]);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/bot/bot.png"
            alt="Plug"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-contain"
          />
          <div>
            <p className="font-display text-sm text-slate-700">Tel-Z Plug</p>
            <HudLabel className="text-emerald-500/80">ONLINE</HudLabel>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.sender === "bot" ? "items-end" : "items-start"
            }`}
          >
            <HudLabel className="mb-1 text-slate-400">
              {message.sender === "bot" ? "TEL-Z PLUG" : "CUSTOMER"}
            </HudLabel>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                message.sender === "bot"
                  ? "bg-orange-500 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex flex-col items-end">
            <HudLabel className="mb-1 text-slate-400">TEL-Z PLUG</HudLabel>
            <div className="max-w-[80%] rounded-2xl bg-orange-500 px-4 py-2 text-sm text-white/80">
              typing…
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>

      {/* input */}
      <div className="flex items-center gap-2 border-t border-slate-100 p-3">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSend();
          }}
          placeholder="Type a message…"
          className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="button"
          onClick={handleSend}
          className="cursor-pointer rounded-full bg-orange-500 p-2 text-white transition hover:opacity-90"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default PlugChat;
