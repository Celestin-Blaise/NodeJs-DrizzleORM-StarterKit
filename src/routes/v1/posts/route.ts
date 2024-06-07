import db from "@/db";
import { posts } from "@/db/schema";
import express from "express";
import type { Request, Response } from "express";

export const post = express.Router();

// GET:
post.get("/", async (_request: Request, response: Response) => {
  try {
    // const check_existing_user = await db.query.posts.findMany();
    const posts = await db.query.posts.findMany({
      with: {
        comments: true,
      },
    });
    return response.status(200).json(posts);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

post.get("/api", async (_request: Request, response: Response) => {
  const newPost = {
    title: "GAME OF THRONE",
    description: "Incredible movie this one !!!",
    category: "Fiction",
    author: "JACK MA",
  };

  try {
    const insertedComment = await db.insert(posts).values(newPost).returning();
    return response.status(200).json(insertedComment);
  } catch (error: any) {
    return response.status(500).json(error);
  }
});
