import type OrderModel from "../../../models/order.model";
import { useNavigate } from "react-router-dom";
import ProgressListItem from "../../../components/ProgressListItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import type RecordModel from "../../../models/record.model";
import type PartModel from "../../../models/part.model";
import { Stack, Typography } from "@mui/material";
import clamp from "../../../utils";

type OrderListItemProps = {
  order: OrderModel;
};

export default function OrderListItem({ order }: OrderListItemProps) {
  const navigate = useNavigate();

  const parts = useLiveQuery(() => db.parts.where("orderId").equals(order.id).toArray(), []) ?? [];
  const records =
    useLiveQuery(
      () =>
        db.records
          .where("partId")
          .anyOf(parts.map((part) => part.id))
          .toArray(),
      [parts],
    ) ?? [];

  const printed = records.reduce((acc: number, record: RecordModel) => acc + record.printed, 0);
  const quantity = parts.reduce((acc: number, part: PartModel) => acc + part.quantity, 0);
  const progress = quantity === 0 ? 0 : (100 * printed) / quantity;

  return (
    <ProgressListItem
      header={<Header order={order} printingProgress={progress} />}
      footer={<Footer order={order} />}
      progress={progress}
      OnListItemClick={() => navigate("/printing-tracker/order/" + order.id)}
    />
  );
}

function Header({ order, printingProgress }: { order: OrderModel; printingProgress: number }) {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
      <Typography variant="h6">{order.title}</Typography>
      <Typography>{`${Math.round(clamp(printingProgress, 0, 100))}%`}</Typography>
    </Stack>
  );
}

function Footer({ order }: { order: OrderModel }) {
  return (
    order.dueDate instanceof Date && <Typography>{order.dueDate.toLocaleDateString()}</Typography>
  );
}
