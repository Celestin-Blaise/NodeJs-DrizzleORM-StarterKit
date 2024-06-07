import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  timestamp,
  varchar,
  boolean,
  text,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import posts from "./posts";

export const ApprovedStatus = pgEnum("is_approved", ["TRUE", "FALSE"]);

const user_comments = pgTable("user_comments", {
  id: serial("id").primaryKey(),
  message: text("description"),
  isApproved: ApprovedStatus("is_approved").notNull().default("FALSE"),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const commentsRelations = relations(user_comments, ({ one, many }) => ({
  posts: one(posts, {
    fields: [user_comments.postId],
    references: [posts.id],
  }),
}));

export default user_comments;
