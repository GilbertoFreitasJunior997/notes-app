import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdAdd } from "react-icons/md";
import { Textarea } from "./ui/textarea";
import { useNotes } from "@/store";
import { useSelector } from "@/store/use-selector";

export const ModalCreateNote = () => {
  const { add } = useNotes(useSelector("add"));

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

    add({
      title,
      description,
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <MdAdd />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New note</DialogTitle>
          <DialogDescription>
            <form className="flex flex-col gap-3 pt-2" onSubmit={handleSubmit}>
              <Input type="text" ref={titleRef} placeholder="Title" />
              <Textarea ref={descriptionRef} placeholder="Description" />

              <div className="flex justify-end items-center gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
