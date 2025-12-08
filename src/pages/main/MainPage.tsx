import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db } from "../../db";
import AddOrderDialog from "./AddOrderDialog";
import OrderModel from "./models/orderModel";
import PrintingReport from "./PrintingReport";

export default function MainPage() {
  const [isOpenAddOrderDialog, setIsOpenAddOrderDialog] = useState(false);

  const orders = useLiveQuery(() => db.orders.toArray(), []) ?? [];

  const handleAddNewOrder = async (order: OrderModel) => {
    try {
      await db.orders.add(order);
    } catch (error) {
      console.error(`Failed to add ${order.title} ${order.code} `, error);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" height="100vh">
        <Box
          p={2}
          bgcolor="primary.main"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Printing Tracker</Typography>
          <Button color="inherit" onClick={() => setIsOpenAddOrderDialog(true)}>
            + Замовлення
          </Button>
        </Box>

        <Box p={2} bgcolor="#f5f5f5">
          <PrintingReport />
        </Box>

        <Box p={1}>
          <TextField size="small" variant="outlined" fullWidth />
        </Box>
        <Box overflow="auto">
          <List>
            {orders.map((order) => (
              <ListItem key={order.id} divider>
                <ListItemText primary={order.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <AddOrderDialog
        isOpen={isOpenAddOrderDialog}
        onClose={() => setIsOpenAddOrderDialog(false)}
        onSubmit={handleAddNewOrder}
      />
    </>
  );
}
