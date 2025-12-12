import { TextField } from "@mui/material";

export default function AddPartForm() {
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
        name="quantity"
        label="Кількість"
        type="number"
        fullWidth
        variant="standard"
      />
    </>
  );
}
