import { UseNotes } from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotes = create<UseNotes>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (newNote) => {
        let maxId = 1;
        const { notes } = get();
        notes.forEach((note) => {
          if (note.id > maxId) maxId = note.id;
        });
        set(({ notes }) => ({
          notes: [...notes, { ...newNote, id: maxId }],
        }));
      },
      removeNote: (id) =>
        set(({ notes }) => ({ notes: notes.filter((note) => note.id !== id) })),
      removeMultipleNotes: (ids) =>
        set(({ notes }) => ({
          notes: notes.filter((note) => !ids.includes(note.id)),
        })),
    }),
    {
      name: "notes",
    }
  )
);
