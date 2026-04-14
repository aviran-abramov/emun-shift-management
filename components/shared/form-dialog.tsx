"use client";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";

interface FormDialogProps {
  buttonName: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormDialog({
  buttonName,
  title,
  description,
  children,
}: FormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-start">
          <span className="text-xl">+</span>
          <span>{buttonName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
