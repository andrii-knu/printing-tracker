import AddIcon from "@mui/icons-material/Add";
import { Box, Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate";
import { db } from "../../db";
import type OrderModel from "../../models/order.model";
import AddOrderDialog from "./elements/AddOrderDialog";
import PrintingReport from "./elements/PrintingReport";

export default function HomePage() {
  const [isOpenAddOrderDialog, setIsOpenAddOrderDialog] = useState(false);
  const orders = useLiveQuery(() => db.orders.toArray(), []) ?? [];
  const navigate = useNavigate();

  const handleAddNewOrder = async (order: OrderModel) => {
    try {
      await db.orders.add(order);
    } catch (error) {
      console.error(`Failed to add ${order.title} ${order.code} `, error);
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

      <AddOrderDialog
        isOpen={isOpenAddOrderDialog}
        onClose={() => setIsOpenAddOrderDialog(false)}
        onSubmit={handleAddNewOrder}
      />
    </>
  );
}
