export type Plan = {
  name: string;
  speed: string;
  price: string;
  description: string;
  gradient: string;
};

export const PLANS: Plan[] = [
  {
    name: "CHILL",
    speed: "10mbps",
    price: "500/=pm",
    description:
      "Entry speed for always-on access. Perfect for WhatsApp and light study.",
    // bronze
    gradient:
      "linear-gradient(135deg, #6B3A1F 0%, #C47C3A 25%, #E8B882 50%, #C47C3A 75%, #6B3A1F 100%)",
  },
  {
    name: "FAST",
    speed: "30mbps",
    price: "1,000/=pm",
    description:
      "Mainstream high-speed tier. For creators, online sellers, and daily streaming.",
    // silver
    gradient:
      "linear-gradient(135deg, #5A5A5A 0%, #C0C4CC 25%, #F0F2F4 50%, #C0C4CC 75%, #5A5A5A 100%)",
  },
  {
    name: "SUPERSONIC",
    speed: "80mbps",
    price: "2,000/=pm",
    description:
      "Top-speed hero tier. For gaming, heavy streaming, and power users.",
    // gold
    gradient:
      "linear-gradient(135deg, #7A4F00 0%, #D4A017 25%, #F5D060 50%, #D4A017 75%, #7A4F00 100%)",
  },
];
