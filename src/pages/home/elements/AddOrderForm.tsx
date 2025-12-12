import { TextField } from "@mui/material";

export default function AddOrderForm() {
  return (
    <>
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
        name="quantity"
        label="Кількість в комплекті"
        type="number"
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        name="dueDate"
        label="Відправити до"
        type="date"
        fullWidth
        variant="standard"
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </>
  );
}
