export type Note = {
  id: number;
  title: string;
  description: string;
};

export type NewNote = Omit<Note, "id">;

type NoteProps = {
  notes: Note[];
};

type NoteActions = {
  addNote(newNote: NewNote): void;
  removeNote(id: number): void;
  removeMultipleNotes(ids: number[]): void;
};

export type UseNotes = NoteProps & NoteActions;
