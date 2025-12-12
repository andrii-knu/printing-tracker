import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type PartModel from "../../../models/part.model";

type AddPartDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (part: PartModel) => void;
};

export default function AddPartDialog({ isOpen, onClose, onSubmit }: AddPartDialogProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    onSubmit({
      title: formJson.title,
      quantity: Number(formJson.quantity),
    } as PartModel);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Додати нове замовлення</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="subscription-form">
          <TextField
            required
            margin="dense"
            name="title"
            label="Назва"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="quantity"
            label="Кількість"
            type="number"
            fullWidth
            variant="standard"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button type="submit" form="subscription-form">
          Додати
        </Button>
      </DialogActions>
    </Dialog>
  );
}
