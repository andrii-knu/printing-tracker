import AddIcon from "@mui/icons-material/Add";
import { Box, Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate";
import { db } from "../../db";
import type OrderModel from "../../models/order.model";
import AddDialog from "../../components/AddDialog";
import AddOrderForm from "./elements/AddOrderForm";
import PrintingReport from "./elements/PrintingReport";

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
        headerControls={
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setIsOpenAddOrderDialog(true)}
            startIcon={<AddIcon />}
          >
            Замовлення
          </Button>
        }
      >
        <Box p={2} bgcolor="#f5f5f5">
          <PrintingReport />
        </Box>

        <Box p={1}>
          <TextField size="small" variant="outlined" fullWidth />
        </Box>
        <Box overflow="auto">
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
        </Box>
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
