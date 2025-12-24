import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type MenuOptionsProps = {
  anchor: null | HTMLElement;
  onDeleteClick: () => void;
  onClose: () => void;
};

export default function MenuOptions({ anchor, onDeleteClick, onClose }: MenuOptionsProps) {
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
