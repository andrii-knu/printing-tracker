import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type OrderModel from "./models/orderModel";

type AddOrderDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: OrderModel) => void;
};

export default function AddOrderDialog({ isOpen, onClose, onSubmit }: AddOrderDialogProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    onSubmit({
      title: formJson.title,
      code: Number(formJson.code),
      dueDate: new Date(formJson.dueDate as string),
    } as OrderModel);
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
            name="code"
            label="Номер замовлення"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="dueDate"
            label="Відправити до"
            type="date"
            fullWidth
            variant="standard"
            slotProps={{ inputLabel: { shrink: true } }}
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
