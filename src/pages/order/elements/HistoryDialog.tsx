import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import type PartModel from "../../../models/part.model";
import type RecordModel from "../../../models/record.model";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";

type HistoryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  part: PartModel | null;
};

export default function HistoryDialog({ isOpen, onClose, part }: HistoryDialogProps) {
  const records =
    useLiveQuery(() => {
      if (!part) return [];
      return db.records.where("partId").equals(part.id).reverse().toArray();
    }, [part?.id]) ?? [];

  return (
    part && (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{`Історія ${[part.title]}`}</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <RecordsList records={records} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Закрити</Button>
        </DialogActions>
      </Dialog>
    )
  );
}

type RecordsListProps = {
  records: RecordModel[];
};

function RecordsList({ records }: RecordsListProps) {
  return (
    <List>
      {records.map((record) => (
        <ListItem
          key={record.id}
          divider
          sx={{
            "&:hover": { backgroundColor: "#f9f9f9" },
          }}
        >
          <ListItemText
            slotProps={{ primary: { component: "div" }, secondary: { component: "div" } }}
            primary={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarTodayIcon sx={{ fontSize: 14, mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" fontWeight="600" color="text.primary">
                  {record.date.toLocaleDateString()}
                </Typography>
              </Box>
            }
            secondary={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon sx={{ fontSize: 14, mr: 1, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {record.date.toLocaleTimeString()}
                </Typography>
              </Box>
            }
          />

          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "#2e7d32",
                pl: 4,
                pr: 1,
              }}
            >
              +{record.printed}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
