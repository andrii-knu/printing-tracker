import { TextField } from "@mui/material";

export default function AddRecordForm() {
  return (
    <TextField
      required
      margin="dense"
      name="printed"
      label="Кількість"
      type="number"
      fullWidth
      variant="standard"
    />
  );
}
