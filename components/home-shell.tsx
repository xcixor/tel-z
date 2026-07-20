"use client";

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
              />
            )}
            {!isChatOpen && (
              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="absolute bottom-4 right-4 h-16 w-16 cursor-pointer bg-transparent p-0"
                style={{
                  backgroundImage: "url('/assets/bot/bot.png')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            )}
          </>
        )}
      </CornerFrame>
    </main>
  );
}

export default HomeShell;
