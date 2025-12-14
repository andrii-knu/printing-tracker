import { TextField } from "@mui/material";

type AddPartFormProps = {
  defaultQuantity: number;
};

export default function AddPartForm({ defaultQuantity }: AddPartFormProps) {
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
        value={defaultQuantity}
        type="number"
        fullWidth
        variant="standard"
      />
    </>
  );
}
