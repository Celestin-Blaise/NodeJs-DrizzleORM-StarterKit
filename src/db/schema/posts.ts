import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  timestamp,
  varchar,
  boolean,
  text,
} from "drizzle-orm/pg-core";
import comments from "./user_comments";

const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 255 }),
  author: varchar("author", { length: 255 }),
  remark: text("remark").notNull().default("NO REMARK"),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),

  // createdAt: timestamp("created_at", { withTimezone: true })
  // .default(sql`CURRENT_TIMESTAMP`)
  // .notNull(),
  // updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const postRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
}));

export default posts;
