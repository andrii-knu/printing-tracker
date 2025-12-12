import AddIcon from "@mui/icons-material/Add";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate";
import { db } from "../../db";
import type PartModel from "../../models/part.model";
import AddPartDialog from "./elements/AddPartDialog";
import OrderInfo from "./elements/OrderInfo";

export default function OrderPage() {
  const [isOpenAddPartDialog, setIsOpenAddPartDialog] = useState(false);
  const { order_id } = useParams();
  const order = useLiveQuery(() => db.orders.get(Number(order_id)));
  const parts =
    useLiveQuery(() => db.parts.where("orderId").equals(Number(order_id)).toArray(), []) ?? [];

  if (order === undefined) return "Order not found";

  const handleAddPart = async (part: PartModel) => {
    try {
      part.orderId = order.id;
      part.printed = 0;
      await db.parts.add(part);
    } catch (error) {
      console.error("Failde to add part to order with id: ", order_id, error);
    }
  };

  return (
    <>
      <PageTemplate
        title={`${order?.title}`}
        headerControls={
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setIsOpenAddPartDialog(true)}
            startIcon={<AddIcon />}
          >
            Деталь
          </Button>
        }
      >
        <Box>{order && <OrderInfo order={order} />}</Box>
        <Box overflow="auto">
          <List>
            {parts.map((part) => (
              <ListItem key={part.id} divider>
                <ListItemText primary={part.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </PageTemplate>
      <AddPartDialog
        isOpen={isOpenAddPartDialog}
        onClose={() => setIsOpenAddPartDialog(false)}
        onSubmit={(part) => handleAddPart(part)}
      />
    </>
  );
}
