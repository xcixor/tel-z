"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useState } from "react";

import HudLabel from "../hud/hud-label";
import AddMembersTab from "./add-members-tab";
import SquadBoostTab from "./squad-boost-tab";
import { Contact, HurdleMember, INITIAL_CONTACTS } from "./types";

type Tab = "add" | "boost";

type Props = {
  onExit: () => void;
};

function SquadHub({ onExit }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("add");
  const [availableContacts, setAvailableContacts] =
    useState<Contact[]>(INITIAL_CONTACTS);
  const [hurdle, setHurdle] = useState<HurdleMember[] | null>(null);

  function handleCreateHurdle(members: Contact[]) {
    const selectedIds = new Set(members.map((member) => member.id));

    setHurdle(
      members.map((member) => ({
        id: member.id,
        name: member.name,
        progress: Math.floor(Math.random() * 61) + 20,
      })),
    );
    setAvailableContacts((prev) =>
      prev.filter((contact) => !selectedIds.has(contact.id)),
    );
  }

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto bg-[#3b1a0e] p-6">
      <button
        type="button"
        onClick={onExit}
        className="mb-4 inline-flex items-center self-start cursor-pointer rounded-md bg-white px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-200"
      >
        <ChevronLeftIcon className="mr-1 h-4 w-4" />
        Back
      </button>

      <HudLabel className="mb-2">SQUAD</HudLabel>

      <div className="flex gap-1 rounded-full bg-white/10 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("add")}
          className={`flex-1 cursor-pointer rounded-full py-2 text-xs font-bold uppercase tracking-wide transition ${
            activeTab === "add"
              ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-[#3b1a0e]"
              : "text-amber-100/70 hover:text-amber-100"
          }`}
        >
          Add Members
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("boost")}
          className={`flex-1 cursor-pointer rounded-full py-2 text-xs font-bold uppercase tracking-wide transition ${
            activeTab === "boost"
              ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-[#3b1a0e]"
              : "text-amber-100/70 hover:text-amber-100"
          }`}
        >
          Squad
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "add" ? (
          <AddMembersTab
            contacts={availableContacts}
            onCreateHurdle={handleCreateHurdle}
          />
        ) : (
          <SquadBoostTab hurdle={hurdle} />
        )}
      </div>
    </div>
  );
}

export default SquadHub;
