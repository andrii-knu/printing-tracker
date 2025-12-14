import { Button, IconButton, Stack, Typography } from "@mui/material";
import PartModel from "../../../models/part.model";
import CalculateIcon from "@mui/icons-material/Calculate";
import HistoryIcon from "@mui/icons-material/History";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import type RecordModel from "../../../models/record.model";
import ProgressListItem from "../../../components/ProgressListItem";

type PartListItemProps = {
  part: PartModel;
  OnAddClick?: () => void;
};

export default function PartListItem({ part, OnAddClick }: PartListItemProps) {
  const records =
    useLiveQuery(() => db.records.where("partId").equals(part.id).toArray(), []) ?? [];

  const printed = records.reduce((acc: number, record: RecordModel) => acc + record.printed, 0);
  const printingProgress = (100 * printed) / part.quantity;

  return (
    <ProgressListItem
      header={<Header part={part} printed={printed} />}
      footer={<AddButtonsBar OnAddClick={OnAddClick} />}
      progress={printingProgress}
      secondaryAction={
        <IconButton edge="end">
          <HistoryIcon />
        </IconButton>
      }
    />
  );
}

function Header({ part, printed }: { part: PartModel; printed: number }) {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
      <Typography variant="h6">{part.title}</Typography>
      <Typography>{`${printed}/${part.quantity}`}</Typography>
    </Stack>
  );
}

function AddButtonsBar({ OnAddClick }: { OnAddClick?: () => void }) {
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
}
