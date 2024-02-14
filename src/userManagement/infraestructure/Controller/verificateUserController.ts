import { VerificateUserUseCase } from "../../application/UseCase/verificateUserUseCase";
import { Request, Response } from "express";


export class VerificateUserController {

    constructor( readonly verificateUserUseCase: VerificateUserUseCase){}

    async update(req:Request, res:Response){
        try {
            let { token } = req.params;

            const verificate = await this.verificateUserUseCase.update(token);
            
            if(verificate){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        user: verificate
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found."
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