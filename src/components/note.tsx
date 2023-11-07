import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { MdDelete } from "react-icons/md";
import { ModalConfigureNote } from "./modal-configure-note";
import { Note as NoteProps } from "@/store/types";
import { useNotes } from "@/store";
import { useSelector } from "@/store/use-selector";

export const Note = (props: NoteProps) => {
  const { id, title, description } = props;

  const { toggleSelect, selected, remove } = useNotes(
    useSelector("toggleSelect", "selected", "remove")
  );

  const isSelected = selected.includes(id);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    remove(id);
  };

  const handleSelect = () => toggleSelect(id);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;

    handleSelect();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`rounded-md border-slate-300 dark:border-slate-700 border w-full h-52 flex flex-col p-1 group ${
        isSelected ? "ring-primary ring-1" : ""
      }`}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <section className="px-2 flex justify-between h-8">
        <p className="text-lg font-bold truncate mr-1">{title}</p>
        <div className="flex items-center gap-2 h-full">
          <Checkbox
            className={`hidden transition-opacity ${
              isSelected ? "block" : "group-hover:block"
            }`}
            checked={isSelected}
          />

          <Button
            size="icon"
            variant="ghost"
            className="w-5 h-5"
            onClick={handleRemove}
          >
            <MdDelete />
          </Button>

          <ModalConfigureNote initialValues={props} />
        </div>
      </section>
      <section className="overflow-auto grow px-2">{description}</section>
    </div>
  );
};
