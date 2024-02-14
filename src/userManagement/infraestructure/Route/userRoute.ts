import { registerUserController, verificateUserController } from "../dependencies";
import express  from "express";

export const userRouter = express.Router();


userRouter.post("/", registerUserController.register.bind(registerUserController));

userRouter.put("/:token/activate", verificateUserController.update.bind(verificateUserController));

