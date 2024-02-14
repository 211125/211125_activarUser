import { UserMysqlRepository } from "./Repository/userMysqlRepository";

import { RegisterUserUseCase } from "../application/UseCase/registerUserUseCase";
import { RegisterUserController } from "./Controller/registerUserController";

import { VerificateUserUseCase } from "../application/UseCase/verificateUserUseCase";
import { VerificateUserController } from "./Controller/verificateUserController";


export const userMysqlRepository = new UserMysqlRepository()

export const registerUseCase = new RegisterUserUseCase(userMysqlRepository);
export const registerUserController = new RegisterUserController(registerUseCase,);

export const verificateUserUseCase = new VerificateUserUseCase(userMysqlRepository);
export const verificateUserController = new VerificateUserController(verificateUserUseCase);

