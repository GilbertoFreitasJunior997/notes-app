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
        const { notes } = get();
        console.log(notes);
        const id = Math.max(...notes.map((note) => note.id), 0) + 1;
        console.log(id);

        set(({ notes }) => ({
          notes: [...notes, { ...newNote, id }],
        }));
      },
      update: (newNote) =>
        set(({ notes }) => ({
          notes: notes.map((note) => (note.id === newNote.id ? newNote : note)),
        })),
      remove: (id) =>
        set(({ notes, selected }) => ({
          notes: notes.filter((note) => note.id !== id),
          selected: selected.filter((noteId) => noteId !== id),
        })),
      toggleSelect: (id) =>
        set(({ selected }) => ({
          selected: selected.includes(id)
            ? selected.filter((noteId) => noteId !== id)
            : [...selected, id],
        })),
      removeSelected: () =>
        set(({ notes, selected }) => ({
          notes: notes.filter((note) => !selected.includes(note.id)),
          selected: [],
        })),
      setSearch: (search) => set(() => ({ search })),
    }),
    {
      name: "notes",
    }
  )
);
