import { Router } from "express";
import { post } from "./posts/route";
import { comments } from "./comments/route";

const v1_rootRouter: Router = Router();

v1_rootRouter.use("/v1/posts", post);
v1_rootRouter.use("/v1/comments", comments);

export default v1_rootRouter;
