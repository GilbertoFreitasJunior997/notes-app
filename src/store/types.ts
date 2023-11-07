export type Note = {
  id: number;
  title: string;
  description: string;
};

export type NewNote = Omit<Note, "id">;

type NoteProps = {
  notes: Note[];
  selected: number[];
};

type NoteActions = {
  add(newNote: NewNote): void;
  remove(id: number): void;
  select(id: number): void;
  removeSelected(): void;
};

export type UseNotes = NoteProps & NoteActions;
