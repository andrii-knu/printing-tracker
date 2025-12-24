import { Box, LinearProgress, ListItem, ListItemText } from "@mui/material";
import type { ReactNode } from "react";
import clamp from "../utils";

type ProgressListItemProps = {
  header: ReactNode;
  footer?: ReactNode;
  secondaryAction?: ReactNode;
  progress: number;
  OnListItemClick?: () => void;
};

type ProgressBarColor = "success" | "inherit" | "primary";

function getProgressBarColor(progress: number): ProgressBarColor {
  if (progress >= 100) {
    return "success";
  }
  if (progress === 0) {
    return "inherit";
  }
  return "primary";
}

export default function ProgressListItem({
  header,
  footer,
  secondaryAction,
  progress,
  OnListItemClick,
}: ProgressListItemProps) {
  return (
    <ListItem
      divider
      secondaryAction={secondaryAction}
      onClick={OnListItemClick}
      sx={{
        "&:hover": { backgroundColor: "#f9f9f9" },
      }}
    >
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
            color={getProgressBarColor(progress)}
          />
        </Box>
      </Box>
    </Box>
  );
}
