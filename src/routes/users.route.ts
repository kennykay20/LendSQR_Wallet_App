import express from "express";
import { container } from "tsyringe";
import { UserController } from "../users/user.controller";

const userCtl = container.resolve(UserController);
export default (router: express.Router) => {
  console.log("inside the user route");
  router.post("/api/v1/user/register", userCtl.CreateUser);
  router.get("/api/v1/users", userCtl.GetAllUsers);
  router.get("/api/v1/users/:id", userCtl.GetUser);
  router.put("/api/v1/users/:id", userCtl.UpdateUser);
  router.delete("/api/v1/users/:id", userCtl.DeleteUser);
  return router;
};
