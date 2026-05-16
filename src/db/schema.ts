import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";

export const paymentStatusVals = ["pending", "completed", "failed"] as const;
export const paymentStatusEnum = pgEnum("payment_status", paymentStatusVals);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url"),
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  features: text("features"),
  tag: text("tag"),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const customers = pgTable("customers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .unique()
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 13 }),
  amount: decimal("amount", { precision: 8, scale: 2 }).notNull(),
  productIds: integer("product_id")
    .array()
    .notNull()
    .default(sql`'{}'::integer[]`),
  paid: boolean("paid").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .unique()
    .notNull(),
  customerId: text("customer_id").references(() => customers.id, {
    onDelete: "cascade",
  }),
  amount: decimal("amount", { precision: 8, scale: 2 }).notNull(),
  paymentStatus: paymentStatusEnum("payment_status")
    .notNull()
    .default("pending"),
  paymentDate: timestamp("payment_date", { mode: "date" }).notNull(),
  transactionId: text("transaction_id").notNull().unique(),
  PaymentMethod: text("payment_method").notNull(),
  gatewayResponse: text("gateway_response"),
  // Future: receiptUrl etc.
});
