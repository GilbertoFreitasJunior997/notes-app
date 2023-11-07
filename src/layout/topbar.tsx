import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { IoMdTrash } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNotes } from "@/store";
import { useSelector } from "@/store/use-selector";

export const Topbar = () => {
  const { selected, removeSelected } = useNotes(
    useSelector("selected", "removeSelected")
  );

  return (
    <section className="w-full h-16 flex justify-between items-center p-5 dark:bg-slate-950 bg-slate-50 rounded-t-md px-5">
      <div></div>
      <div className="flex gap-2 items-center">
        <Button
          variant="destructive"
          disabled={!selected.length}
          onClick={removeSelected}
        >
          <IoMdTrash />
          <span className="pl-1">Remove all selected</span>
        </Button>
        
        <Dialog>
          <DialogTrigger>
            <Button size="icon">
              <MdAdd />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <ThemeToggle />
      </div>
    </section>
  );
};
