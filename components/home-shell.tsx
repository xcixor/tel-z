"use client";

import Image from "next/image";
import { useState } from "react";

import BodyWrapper from "./body-wrapper";
import CornerFrame from "./hud/corner-frame";
import OnboardingFlow from "./onboarding/onboarding-flow";
import PlugChat from "./plug-chat";

const DEFAULT_ACTION = "Dashboard";

function HomeShell() {
  const [selectedAction, setSelectedAction] = useState<string>(DEFAULT_ACTION);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [userName, setUserName] = useState("");

  function handleLogout() {
    setHasOnboarded(false);
    setUserName("");
    setSelectedAction(DEFAULT_ACTION);
    setIsChatOpen(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200">
      <CornerFrame className="h-screen w-full overflow-hidden bg-white shadow-2xl sm:h-[676px] sm:w-[390px] sm:rounded-3xl">
        {!hasOnboarded ? (
          <OnboardingFlow
            onComplete={(name) => {
              setUserName(name);
              setHasOnboarded(true);
            }}
          />
        ) : (
          <>
            {isChatOpen ? (
              <PlugChat onClose={() => setIsChatOpen(false)} />
            ) : (
              <BodyWrapper
                selectedAction={selectedAction}
                onSelect={setSelectedAction}
                onBack={() => setSelectedAction(DEFAULT_ACTION)}
                userName={userName}
                onLogout={handleLogout}
              />
            )}
            {!isChatOpen && (
              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="absolute bottom-2 right-0 h-16 w-16 cursor-pointer bg-transparent p-0"
              >
                <Image
                  src="/assets/bot/bot.png"
                  alt="Chat with Plug"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </button>
            )}
          </>
        )}
      </CornerFrame>
    </main>
  );
}

export default HomeShell;
