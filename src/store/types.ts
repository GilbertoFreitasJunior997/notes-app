export type Note = {
  id: number;
  title: string;
  description?: string;
};

export type NewNote = Omit<Note, "id">;

type NoteProps = {
  notes: Note[];
  selected: number[];
  search: string;
};

type NoteActions = {
  add(newNote: NewNote): void;
  update(note: Note): void;
  remove(id: number): void;
  toggleSelect(id: number): void;
  removeSelected(): void;
  setSearch(search: string): void;
};

export type UseNotes = NoteProps & NoteActions;
