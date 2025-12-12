import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import type OrderModel from "../../../models/order.model";
import { List, ListItem, ListItemText } from "@mui/material";

type PartsListProps = {
  order: OrderModel;
};

export default function PartsList({ order }: PartsListProps) {
  const parts = useLiveQuery(() => db.parts.where("orderId").equals(order.id).toArray());

  return (
    <List>
      {parts?.map((part) => (
        <ListItem key={part.id}>
          <ListItemText primary={part.title} />
        </ListItem>
      ))}
    </List>
  );
}
