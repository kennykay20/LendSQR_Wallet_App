import express from "express";
import { container } from "tsyringe";
import { UserController } from "../users/user.controller";
import { AuthController } from "../Authorization/auth.controller";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

const userCtl = container.resolve(UserController);
const authCtr = container.resolve(AuthController);
const authCheck = container.resolve(AuthenticationMiddleware);
export default (router: express.Router) => {
  console.log("inside the user route");
  router.post("/api/v1/user/register", userCtl.CreateUser);
  router.post("/api/v1/auth/login", authCtr.UserLogin);
  router.get("/api/v1/users", authCheck.isOwnerUser, userCtl.GetAllUsers);
  router.get("/api/v1/users/:id", authCheck.isOwnerUser, userCtl.GetUser);
  router.put("/api/v1/users/:id", authCheck.isOwnerUser, userCtl.UpdateUser);
  router.put("/api/v1/users/status/:id", userCtl.UpdateUserActive);
  router.delete("/api/v1/users/:id", authCheck.isOwnerUser, userCtl.DeleteUser);
  return router;
};
