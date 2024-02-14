import { RegisterUserUseCase } from "../../application/UseCase/registerUserUseCase";
import { Request, Response } from "express";
import { EmailService } from "../Service/email";
import { User } from "../../domain/Entity/user";

export class RegisterUserController {
    constructor(readonly registerUserUseCase: RegisterUserUseCase) { }

    async register(req: Request, res: Response) {
        let { name, lastName, cellphone, email, password } = req.body;
        try {
            let user = await this.registerUserUseCase.run({ name, lastName, cellphone, email, password });

            if (user) {
                const apiKey = 're_A3TjUmgz_EnzqgxP8c3TUoCXHboYE9WS7';
                const emailService = new EmailService(apiKey);

                await emailService.run(user);

                return res.status(201).send({
                    status: "succes",
                    data: {
                        uuid: user.uuid,
                        fullName: user.contact.getFullName,
                        email: user.credential.email,
                        Token: user.status.activationToken
                    }
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while delete the user."
            });
        }
    }
}
