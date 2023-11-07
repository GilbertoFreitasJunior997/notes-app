import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdTrash } from "react-icons/io";
import { ModalConfigureNote } from "@/components/modal-configure-note";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNotes } from "@/store";
import { useSelector } from "@/store/use-selector";

export const Topbar = () => {
  const { selected, removeSelected, search, setSearch } = useNotes(
    useSelector("selected", "removeSelected", "search", "setSearch")
  );

  return (
    <section className="w-full h-16 flex justify-between items-center p-5 dark:bg-slate-950 bg-slate-50 rounded-t-md px-5">
      <div className="flex items-center">
        <Input
          placeholder="Search"
          value={search}
          onChange={({ target: { value } }) => setSearch(value || "")}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Button
          variant="destructive"
          disabled={!selected.length}
          onClick={removeSelected}
        >
          <IoMdTrash />
          <span className="pl-1">Remove all selected</span>
        </Button>
        <ModalConfigureNote />
        <ThemeToggle />
      </div>
    </section>
  );
};
