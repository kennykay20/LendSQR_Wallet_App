import express from "express";
const router = express.Router();
import userRouter from "./users.route";
import accountRouter from "./accounts.route";

export default (): express.Router => {
  userRouter(router);
  accountRouter(router);
  return router;
}