import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type OrderMenuOptionsProps = {
  anchor: null | HTMLElement;
  onDeleteClick: () => void;
  onClose: () => void;
};

export default function OrderMenuOptions({
  anchor,
  onDeleteClick,
  onClose,
}: OrderMenuOptionsProps) {
  const isOpen = Boolean(anchor);
  return (
    <Menu
      anchorEl={anchor}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <MenuItem onClick={onDeleteClick}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Delete
      </MenuItem>
    </Menu>
  );
}
