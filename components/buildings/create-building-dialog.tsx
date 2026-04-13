"use client";

import { CreateBuildingForm } from "@/components/buildings/create-building-form";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";

export function CreateBuildingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-start">
          <span className="text-xl">+</span>
          <span>הוסף בניין</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>הוסף בניין</DialogTitle>
          <DialogDescription>מלא את פרטי הבניין החדש</DialogDescription>
        </DialogHeader>

        <CreateBuildingForm />
      </DialogContent>
    </Dialog>
  );
}
