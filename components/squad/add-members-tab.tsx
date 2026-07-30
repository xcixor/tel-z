"use client";

import { CheckIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

import { Contact } from "./types";

const MAX_SQUAD_SIZE = 5;
const CREATED_DISPLAY_MS = 1400;

const AVATAR_COLORS = ["#E44F0A", "#0B4B8B", "#7A4F00", "#441817", "#BA011A"];

function avatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

type Props = {
  contacts: Contact[];
  onCreateHurdle: (members: Contact[]) => void;
};

function AddMembersTab({ contacts, onCreateHurdle }: Props) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isCreated, setIsCreated] = useState(false);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  function toggleContact(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_SQUAD_SIZE) {
        next.add(id);
      }
      return next;
    });
  }

  function handleCreateHurdle() {
    if (selectedIds.size !== MAX_SQUAD_SIZE) return;

    const selectedContacts = contacts.filter((contact) =>
      selectedIds.has(contact.id),
    );
    onCreateHurdle(selectedContacts);

    setIsCreated(true);
    setTimeout(() => {
      setIsCreated(false);
      setSelectedIds(new Set());
    }, CREATED_DISPLAY_MS);
  }

  return (
    <div className="flex flex-1 flex-col">
      <p className="font-display text-2xl uppercase tracking-wide text-white">
        Add Squad Members
      </p>
      <p className="mt-1 text-sm text-amber-100/70">
        Pick 5 contacts from your phone to form a hurdle.
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
        <SearchIcon className="h-4 w-4 shrink-0 text-amber-100/60" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search contacts"
          className="w-full bg-transparent text-sm text-white placeholder:text-amber-100/40 outline-none"
        />
      </div>

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-amber-300">
        {selectedIds.size} of {MAX_SQUAD_SIZE} selected
      </p>

      <div className="mt-2 divide-y divide-white/10">
        {filteredContacts.map((contact, index) => {
          const isSelected = selectedIds.has(contact.id);
          const isDisabled = !isSelected && selectedIds.size >= MAX_SQUAD_SIZE;
          return (
            <button
              key={contact.id}
              type="button"
              onClick={() => toggleContact(contact.id)}
              disabled={isDisabled}
              className="flex w-full cursor-pointer items-center gap-3 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm text-white"
                style={{ background: avatarColor(index) }}
              >
                {contact.name.charAt(0).toUpperCase()}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-amber-50">
                  {contact.name}
                </span>
                <span className="block text-xs text-amber-100/50">
                  {contact.phone}
                </span>
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected
                    ? "border-amber-300 bg-amber-300"
                    : "border-white/30"
                }`}
              >
                {isSelected && (
                  <CheckIcon className="h-4 w-4 text-[#3b1a0e]" />
                )}
              </span>
            </button>
          );
        })}

        {filteredContacts.length === 0 && contacts.length === 0 && (
          <p className="py-6 text-center text-sm text-amber-100/50">
            You&apos;ve added everyone to a hurdle already.
          </p>
        )}

        {filteredContacts.length === 0 && contacts.length > 0 && (
          <p className="py-6 text-center text-sm text-amber-100/50">
            No contacts match &quot;{search}&quot;
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleCreateHurdle}
        disabled={selectedIds.size !== MAX_SQUAD_SIZE}
        className="mt-4 w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Hurdle
      </button>

      {isCreated && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-300/40 bg-[#3b1a0e] px-8 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-400">
              <CheckIcon className="h-7 w-7 text-emerald-400" />
            </div>
            <p className="font-display text-lg uppercase tracking-wide text-white">
              Hurdle Created!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddMembersTab;
