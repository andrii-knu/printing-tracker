import { List } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../../components/AddButton";
import AddDialog from "../../components/AddDialog";
import PageTemplate from "../../components/PageTemplate";
import { db } from "../../db";
import PartModel from "../../models/part.model";
import type RecordModel from "../../models/record.model";
import AddPartForm from "./elements/dialogForms/AddPartForm";
import AddRecordForm from "./elements/dialogForms/AddRecordForm";
import PartListItem from "./elements/PartListItem";
import HistoryDialog from "./elements/HistoryDialog";

export default function OrderPage() {
  const navigate = useNavigate();
  const [isOpenAddPartDialog, setIsOpenAddPartDialog] = useState(false);
  const [isOpenAddRecordDialog, setIsOpenAddRecordDialog] = useState(false);
  const [historyDialogState, setHistoryDialogState] = useState<{
    isOpen: boolean;
    part: PartModel | null;
  }>({ isOpen: false, part: null });

  const selectedPartRef = useRef<PartModel>(null);
  const { order_id } = useParams();
  const order = useLiveQuery(() => db.orders.get(Number(order_id)));
  const parts =
    useLiveQuery(() => db.parts.where("orderId").equals(Number(order_id)).toArray(), []) ?? [];

  if (order === undefined) return "Order not found";

  const handleAddNewPart = async (formJson: { [k: string]: FormDataEntryValue }) => {
    const newPart = {
      title: formJson.title,
      quantity: Number(formJson.quantity),
      orderId: order.id,
    } as PartModel;

    try {
      await db.parts.add(newPart);
    } catch (error) {
      console.error("Failde to add part to order with id: ", order_id, error);
    }
  };

  const handleAddNewRecord = async (formJson: { [k: string]: FormDataEntryValue }) => {
    const newRecord = {
      printed: Number(formJson.printed),
      date: new Date(),
      partId: selectedPartRef.current?.id,
    } as RecordModel;

    try {
      await db.records.add(newRecord);
    } catch (error) {
      console.error("Failed to add a record", error);
    }
  };

  return (
    <>
      <PageTemplate
        title={
          order.dueDate instanceof Date
            ? `${order.title} | Виконати до ${order.dueDate.toLocaleDateString()}`
            : order.title
        }
        childrenTitle="Деталі"
        childrenControls={
          <AddButton OnClick={() => setIsOpenAddPartDialog(true)}>Деталь</AddButton>
        }
        onBack={() => navigate("/printing-tracker/")}
      >
        <List>
          {parts.map((part) => (
            <PartListItem
              key={part.id}
              part={part}
              OnAddClick={() => {
                selectedPartRef.current = part;
                setIsOpenAddRecordDialog(true);
              }}
              OnShowHistoryClick={() => {
                setHistoryDialogState({ isOpen: true, part: part });
              }}
            />
          ))}
        </List>
      </PageTemplate>

      <AddDialog
        title="Додати деталь до замовлення"
        isOpen={isOpenAddPartDialog}
        onClose={() => setIsOpenAddPartDialog(false)}
        onSubmit={handleAddNewPart}
      >
        <AddPartForm defaultQuantity={order.quantity} />
      </AddDialog>

      <AddDialog
        title="Додати запис"
        isOpen={isOpenAddRecordDialog}
        onClose={() => setIsOpenAddRecordDialog(false)}
        onSubmit={handleAddNewRecord}
      >
        <AddRecordForm />
      </AddDialog>

      <HistoryDialog
        isOpen={historyDialogState.isOpen}
        onClose={() => setHistoryDialogState((prev) => ({ ...prev, isOpen: false }))}
        part={historyDialogState.part}
      />
    </>
  );
}
