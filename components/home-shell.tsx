"use client";

import { useState } from "react";

import BodyWrapper from "./body-wrapper";
import TopNav from "./top-nav";

const DEFAULT_ACTION = "Dashboard";

function HomeShell() {
  const [selectedAction, setSelectedAction] = useState<string>(DEFAULT_ACTION);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="relative h-screen w-full overflow-hidden bg-white shadow-2xl sm:h-[712px] sm:w-[390px] sm:rounded-3xl">
        <BodyWrapper
          selectedAction={selectedAction}
          onSelect={setSelectedAction}
          onBack={() => setSelectedAction(DEFAULT_ACTION)}
        />
        {/* Bot action button */}
        <button
          type="button"
          className="absolute bottom-4 right-4 h-16 w-16 bg-transparent p-0"
          style={{
            backgroundImage: "url('/assets/bot/bot.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </div>
    </main>
  );
}

export default HomeShell;
