import { List } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useRef, useState } from "react";
import AddDialog from "../../components/AddDialog";
import PageTemplate from "../../components/PageTemplate";
import { db } from "../../db";
import type OrderModel from "../../models/order.model";
import AddOrderForm from "./elements/AddOrderForm";
import AddButton from "../../components/AddButton";
import OrderListItem from "./elements/OrderListItem";
import OrderMenuOptions from "./elements/OrderMenuOptions";

export default function HomePage() {
  const [isOpenAddOrderDialog, setIsOpenAddOrderDialog] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const orders = useLiveQuery(() => db.orders.toArray(), []) ?? [];
  const selectedOrderRef = useRef<OrderModel | null>(null);

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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, order: OrderModel) => {
    selectedOrderRef.current = order;
    setAnchorMenu(event.currentTarget);
  };

  const handleDeleteOrder = async (order: OrderModel) => {
    try {
      const partsToDelete = await db.parts.where("orderId").equals(order.id).toArray();
      const recordsToDelete = await db.records
        .where("partId")
        .anyOf(partsToDelete.map((part) => part.id))
        .toArray();
      await db.orders.delete(order.id!);
      for (const part of partsToDelete) {
        await db.parts.delete(part.id);
      }
      for (const record of recordsToDelete) {
        await db.records.delete(record.id);
      }
    } catch (error) {
      console.error(`Failed to delete order ${order.title} (ID: ${order.id}):`, error);
    }
    setAnchorMenu(null);
  };

  return (
    <>
      <PageTemplate
        title="Printing Tracker"
        childrenTitle="Мої замовлення"
        childrenControls={
          <AddButton OnClick={() => setIsOpenAddOrderDialog(true)}>Замовлення</AddButton>
        }
      >
        <List>
          {orders.map((order) => (
            <OrderListItem
              key={order.id}
              order={order}
              onMenuClick={(event) => handleMenuClick(event, order)}
            />
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

      <OrderMenuOptions
        anchor={anchorMenu}
        onDeleteClick={() => handleDeleteOrder(selectedOrderRef.current!)}
        onClose={() => setAnchorMenu(null)}
      />
    </>
  );
}
