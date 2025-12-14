import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import PartModel from "../../../models/part.model";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CalculateIcon from "@mui/icons-material/Calculate";
import HistoryIcon from "@mui/icons-material/History";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import type RecordModel from "../../../models/record.model";
import clamp from "../../../utils";

type PartListItemProps = {
  part: PartModel;
  OnAddClick?: () => void;
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

export default function PartListItem({ part, OnAddClick }: PartListItemProps) {
  const records =
    useLiveQuery(() => db.records.where("partId").equals(part.id).toArray(), []) ?? [];

  const printed = records.reduce((acc: number, record: RecordModel) => acc + record.printed, 0);

  const printingProgress = (100 * printed) / part.quantity;

  const header = () => {
    return (
      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{part.title}</Typography>
          <Typography>{`${printed}/${part.quantity}`}</Typography>
        </Stack>
        <Box sx={{ width: "100%", mb: 1, display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={clamp(printingProgress, 0, 100)}
              color={printingProgress >= 100 ? "success" : "primary"}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  const addButtonsBar = () => {
    return (
      <Stack direction="row" spacing={2}>
        <Button
          startIcon={<CalculateIcon />}
          size="small"
          color="inherit"
          variant="outlined"
          onClick={OnAddClick}
        >
          Додати
        </Button>
      </Stack>
    );
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <IconButton edge="end">
          <HistoryIcon />
        </IconButton>
      }
    >
      <ListItemIcon>{getProgressStatusIcon(printingProgress)}</ListItemIcon>
      <ListItemText
        primary={header()}
        secondary={addButtonsBar()}
        slotProps={{ secondary: { component: "div" } }}
      />
    </ListItem>
  );
}
