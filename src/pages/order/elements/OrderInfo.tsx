import { Box } from "@mui/material";
import type OrderModel from "../../../models/order.model";

type OrderInfoProps = {
  order: OrderModel;
};

export default function OrderInfo({ order }: OrderInfoProps) {
  return (
    <Box p={2} bgcolor="#f5f5f5">
      {order.dueDate instanceof Date && (
        <p>{`Виконати до ${order.dueDate.toLocaleDateString()}`}</p>
      )}
    </Box>
  );
}
