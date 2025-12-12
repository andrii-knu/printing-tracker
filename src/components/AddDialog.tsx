import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { PropsWithChildren } from "react";

type AddDialogProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formJson: { [k: string]: FormDataEntryValue }) => void;
} & PropsWithChildren;

export default function AddDialog({ isOpen, onClose, onSubmit, title, children }: AddDialogProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    onSubmit(formJson);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="add-dialog-form">
          {children}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button type="submit" form="add-dialog-form">
          Додати
        </Button>
      </DialogActions>
    </Dialog>
  );
}
