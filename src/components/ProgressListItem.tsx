import { Box, LinearProgress, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import type { ReactNode } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import clamp from "../utils";

type ProgressListItemProps = {
  header: ReactNode;
  footer?: ReactNode;
  secondaryAction?: ReactNode;
  progress: number;
  OnListItemClick?: () => void;
};

function getProgressStatusIcon(progress: number) {
  if (progress >= 100) {
    return <CheckCircleIcon fontSize="large" color="success" />;
  }
  if (progress === 0) {
    return <PendingIcon fontSize="large" color="disabled" />;
  }
  return <PlayCircleIcon fontSize="large" color="primary" />;
}

export default function ProgressListItem({
  header,
  footer,
  secondaryAction,
  progress,
  OnListItemClick,
}: ProgressListItemProps) {
  return (
    <ListItem divider secondaryAction={secondaryAction} onClick={OnListItemClick}>
      <ListItemIcon>{getProgressStatusIcon(progress)}</ListItemIcon>
      <ListItemText
        primary={<Primary headerNode={header} progress={progress} />}
        secondary={footer}
        slotProps={{ secondary: { component: "div" } }}
      />
    </ListItem>
  );
}

function Primary({ headerNode, progress }: { headerNode: ReactNode; progress: number }) {
  return (
    <Box>
      {headerNode}
      <Box sx={{ width: "100%", mb: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <LinearProgress
            variant="determinate"
            value={clamp(progress, 0, 100)}
            color={progress >= 100 ? "success" : "primary"}
          />
        </Box>
      </Box>
    </Box>
  );
}
