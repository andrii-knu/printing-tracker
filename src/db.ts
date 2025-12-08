// db.ts
import { Dexie, type EntityTable } from "dexie";
import OrderModel from "./pages/main/models/orderModel";

const db = new Dexie("PrintingTrackerDatabase") as Dexie & {
  orders: EntityTable<OrderModel, "id">;
};

db.version(1).stores({
  orders: Object.keys(new OrderModel()).join(", ").replace("id", "++id"),
});

export { db };
