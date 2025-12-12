import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate";
import { db } from "../../db";
import type PartModel from "../../models/part.model";
import OrderInfo from "./elements/OrderInfo";
import AddDialog from "../../components/AddDialog";
import AddPartForm from "./elements/AddPartForm";
import AddButton from "../../components/AddButton";

export default function OrderPage() {
  const [isOpenAddPartDialog, setIsOpenAddPartDialog] = useState(false);
  const { order_id } = useParams();
  const order = useLiveQuery(() => db.orders.get(Number(order_id)));
  const parts =
    useLiveQuery(() => db.parts.where("orderId").equals(Number(order_id)).toArray(), []) ?? [];

  if (order === undefined) return "Order not found";

  const handleAddNewPart = async (formJson: { [k: string]: FormDataEntryValue }) => {
    const newPart = {
      title: formJson.title,
      quantity: Number(formJson.quantity),
      printed: 0,
      orderId: order.id,
    } as PartModel;

    try {
      await db.parts.add(newPart);
    } catch (error) {
      console.error("Failde to add part to order with id: ", order_id, error);
    }
  };

  return (
    <>
      <PageTemplate
        title={`${order?.title}`}
        topChildren={<Box>{order && <OrderInfo order={order} />}</Box>}
        childrenTitle="Деталі"
        childrenControls={
          <AddButton OnClick={() => setIsOpenAddPartDialog(true)}>Деталь</AddButton>
        }
      >
        <List>
          {parts.map((part) => (
            <ListItem key={part.id} divider>
              <ListItemText primary={part.title} />
            </ListItem>
          ))}
        </List>
      </PageTemplate>

      <AddDialog
        title="Додати деталь до замовлення"
        isOpen={isOpenAddPartDialog}
        onClose={() => setIsOpenAddPartDialog(false)}
        onSubmit={handleAddNewPart}
      >
        <AddPartForm />
      </AddDialog>
    </>
  );
}
