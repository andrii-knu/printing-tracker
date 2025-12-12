import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddDialog from "../../components/AddDialog";
import PageTemplate from "../../components/PageTemplate";
import { db } from "../../db";
import type OrderModel from "../../models/order.model";
import AddOrderForm from "./elements/AddOrderForm";
import PrintingReport from "./elements/PrintingReport";
import AddButton from "../../components/AddButton";

export default function HomePage() {
  const [isOpenAddOrderDialog, setIsOpenAddOrderDialog] = useState(false);
  const orders = useLiveQuery(() => db.orders.toArray(), []) ?? [];
  const navigate = useNavigate();

  const handleAddNewOrder = async (formJson: { [k: string]: FormDataEntryValue }) => {
    const newOrder = {
      title: formJson.title,
      code: Number(formJson.code),
      dueDate: formJson.dueDate === "" ? null : new Date(formJson.dueDate as string),
      quantity: Number(formJson.quantity),
    } as OrderModel;

    try {
      await db.orders.add(newOrder);
    } catch (error) {
      console.error(`Failed to add ${newOrder.title} ${newOrder.code} `, error);
    }
  };

  return (
    <>
      <PageTemplate
        title="Printing Tracker"
        topChildren={
          <Box p={2} bgcolor="#f5f5f5">
            <PrintingReport />
          </Box>
        }
        childrenTitle="Мої замовлення"
        childrenControls={
          <AddButton OnClick={() => setIsOpenAddOrderDialog(true)}>Замовлення</AddButton>
        }
      >
        <List>
          {orders.map((order) => (
            <ListItem
              key={order.id}
              divider
              onClick={() => navigate("/printing-tracker/order/" + order.id)}
            >
              <ListItemText primary={order.title} />
            </ListItem>
          ))}
        </List>
      </PageTemplate>

      <AddDialog
        title="Додати нове замовлення"
        isOpen={isOpenAddOrderDialog}
        onClose={() => setIsOpenAddOrderDialog(false)}
        onSubmit={handleAddNewOrder}
      >
        <AddOrderForm />
      </AddDialog>
    </>
  );
}
