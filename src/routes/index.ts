import express from "express";
const router = express.Router();
import userRouter from "./users.route";

export default (): express.Router => {
  userRouter(router);
  return router;
}