import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { PropsWithChildren } from "react";

type AddButtonProps = {
  OnClick: () => void;
} & PropsWithChildren;

export default function AddButton({ children, OnClick }: AddButtonProps) {
  return (
    <Button color="inherit" variant="outlined" onClick={OnClick} startIcon={<AddIcon />}>
      {children}
    </Button>
  );
}
