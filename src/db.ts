import { Dexie, type EntityTable } from "dexie";
import OrderModel from "./models/order.model";
import PartModel from "./models/part.model";

const dbTableBuilder = (model: OrderModel | PartModel) => {
  return Object.keys(model).join(", ").replace("id", "++id");
};

const db = new Dexie("PrintingTrackerDatabase") as Dexie & {
  orders: EntityTable<OrderModel, "id">;
  parts: EntityTable<PartModel, "id">;
};

db.version(1).stores({
  orders: dbTableBuilder(new OrderModel()),
  parts: dbTableBuilder(new PartModel()),
});

export { db };
