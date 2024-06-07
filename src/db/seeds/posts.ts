import type db from "@/db";
import post from "./data/post.json";
import { posts } from "../schema";

export default async function seed(db: db) {
  await db.insert(posts).values(post);
}
