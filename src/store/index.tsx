import { UseNotes } from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotes = create<UseNotes>()(
  persist(
    (set, get) => ({
      notes: [],
      selected: [],
      search: "",
      add: (newNote) => {
        let maxId = 1;
        const { notes } = get();
        notes.forEach((note) => {
          if (note.id > maxId) maxId = note.id;
        });
        set(({ notes }) => ({
          notes: [...notes, { ...newNote, id: maxId }],
        }));
      },
      remove: (id) =>
        set(({ notes }) => ({ notes: notes.filter((note) => note.id !== id) })),
      select: (id) => set(({ selected }) => ({ selected: [...selected, id] })),
      removeSelected: () =>
        set(({ notes, selected }) => ({
          notes: notes.filter((note) => !selected.includes(note.id)),
        })),
      setSearch: (search) => set(() => ({ search })),
    }),
    {
      name: "notes",
    }
  )
);
