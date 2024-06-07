import db from "@/db";
import { comments } from "@/db/schema";
import express from "express";
import type { Request, Response } from "express";

export const comment = express.Router();

// GET:
comment.get("/", async (_request: Request, response: Response) => {
  try {
    const comments = await db.query.comments.findMany({
      with: {
        posts: true,
      },
    });
    return response.status(200).json(comments);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

comment.get("/api", async (_request: Request, response: Response) => {
  const newComment = {
    message: "This is a great post!",
    isApproved: "TRUE",
    postId: 2,
  };

  try {
    //@ts-ignore
    const insertedComment = await db
      .insert(comments)
      //@ts-ignore
      .values(newComment)
      .returning({ id: comments.id, message: comments.message });
    return response.status(200).json(insertedComment);
  } catch (error: any) {
    return response.status(500).json(error);
  }
});
