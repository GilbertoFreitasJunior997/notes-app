import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdAdd, MdEdit } from "react-icons/md";
import { useRef, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Note } from "@/store/types";
import { Textarea } from "./ui/textarea";
import { useNotes } from "@/store";
import { useSelector } from "@/store/use-selector";

type ModalConfigureNoteProps = {
  initialValues?: Note;
};

export const ModalConfigureNote = (props: ModalConfigureNoteProps) => {
  const { initialValues } = props;
  const isEdit = !!initialValues;

  const { add, update } = useNotes(useSelector("add", "update"));

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!title) {
      return;
    }

    if (isEdit) {
      update({
        id: initialValues.id,
        title,
        description,
      });
    } else {
      add({
        title,
        description,
      });
    }

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            size="icon"
            variant="outline"
            className="w-5 h-5"
            onClick={(e) => e.stopPropagation()}
          >
            <MdEdit />
          </Button>
        ) : (
          <Button size="icon">
            <MdAdd />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? `Update note ${initialValues.title}` : "New"} note
          </DialogTitle>
          <form className="flex flex-col gap-3 pt-2" onSubmit={handleSubmit}>
            <Input
              type="text"
              ref={titleRef}
              placeholder="Title"
              defaultValue={initialValues?.title}
              required
            />
            <Textarea
              ref={descriptionRef}
              placeholder="Description"
              defaultValue={initialValues?.description}
            />

            <div className="flex justify-end items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
