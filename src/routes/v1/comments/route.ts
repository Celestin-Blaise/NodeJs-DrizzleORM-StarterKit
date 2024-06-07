import db from "@/db";
import { user_comments } from "@/db/schema";
import express from "express";
import type { Request, Response } from "express";

export const comments = express.Router();

// GET:
comments.get("/", async (_request: Request, response: Response) => {
  try {
    const user_comments = await db.query.user_comments.findMany({
      with: {
        posts: true,
      },
    });
    return response.status(200).json(user_comments);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

comments.get("/api", async (_request: Request, response: Response) => {
  const newComment = {
    message: "This is a great post!",
    isApproved: "TRUE",
    postId: 2,
  };

  try {
    //@ts-ignore
    const insertedComment = await db
      .insert(user_comments)
      //@ts-ignore
      .values(newComment)
      .returning({ id: user_comments.id, message: user_comments.message });
    return response.status(200).json(insertedComment);
  } catch (error: any) {
    return response.status(500).json(error);
  }
});
