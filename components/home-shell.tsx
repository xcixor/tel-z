"use client";

import { useState } from "react";

import BodyWrapper from "./body-wrapper";
import TopNav from "./top-nav";

const DEFAULT_ACTION = "Dashboard";

function HomeShell() {
  const [selectedAction, setSelectedAction] = useState<string>(DEFAULT_ACTION);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="h-[712px] w-[390px] max-w-full overflow-hidden rounded-3xl bg-white shadow-2xl">
        <BodyWrapper
          selectedAction={selectedAction}
          onSelect={setSelectedAction}
          onBack={() => setSelectedAction(DEFAULT_ACTION)}
        />
      </div>
    </main>
  );
}

export default HomeShell;
