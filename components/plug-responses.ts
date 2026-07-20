type ReplyRule = {
  keywords: string[];
  reply: string;
};

const REPLY_RULES: ReplyRule[] = [
  {
    keywords: ["hi", "hello", "hey", "sasa", "niaje"],
    reply: "Hey! I'm Plug 🧡 Ask me about plans, your wallet, or your data — I got you.",
  },
  {
    keywords: ["plan", "data", "mbps", "unlimited", "speed"],
    reply:
      "We've got 3 unlimited plans: CHILL (10mbps @ 500/=pm), FAST (30mbps @ 1,000/=pm), and SUPERSONIC (80mbps @ 2,000/=pm). No caps, no fine print — head to the Plans tab to pick one.",
  },
  {
    keywords: ["wallet", "pay", "payment", "topup", "top up", "mpesa", "airtel", "gpay"],
    reply:
      "You can top up your TLZ Wallet with Mpesa, Airtel Money, or Gpay right in the app — no shops, no queues.",
  },
  {
    keywords: ["expiry", "expire", "expiring", "scam"],
    reply:
      "Your data never expires with Tel Z — no countdowns, no silent halving, no scam fine print. It's yours until you use it.",
  },
  {
    keywords: ["thank", "thanks", "asante"],
    reply: "Anytime! Stay lit, stay connected. 🧡",
  },
];

const FALLBACK_REPLY =
  "I'm Plug, your Tel Z assistant — ask me about plans, wallet top-ups, or your data.";

export function getPlugReply(input: string): string {
  const normalized = input.toLowerCase();
  const match = REPLY_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  );
  return match ? match.reply : FALLBACK_REPLY;
}
