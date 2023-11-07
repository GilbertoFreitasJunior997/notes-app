import { Note } from "@/components/note";
import { useMemo } from "react";
import { useNotes } from "@/store";
import { useSelector } from "@/store/use-selector";

const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .toLowerCase()
    .replace(/[\s-]|[\u0300-\u036f]/g, "");

export const Content = () => {
  const { notes, search } = useNotes(useSelector("notes", "search"));

  const normalizedSearch = useMemo(() => normalizeText(search), [search]);

  const displayNotes = useMemo(
    () =>
      normalizedSearch
        ? notes.filter(
            (note) =>
              normalizeText(note.title).includes(normalizedSearch) ||
              (note.description
                ? normalizeText(note.description).includes(normalizedSearch)
                : false)
          )
        : notes,
    [normalizedSearch, notes]
  );

  return (
    <main className="dark:bg-slate-950 bg-slate-50 flex-grow rounded-b-md px-5">
      <hr className="dark:bg-slate-800 bg-slate-200 h-[2px] rounded-full" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 pt-2">
        {notes.length ? (
          displayNotes.length ? (
            displayNotes.map((note) => <Note key={note.id} {...note} />)
          ) : (
            <p> No note for this search. </p>
          )
        ) : (
          <p> No Note added yet! Try creating one. </p>
        )}
      </div>
    </main>
  );
};
