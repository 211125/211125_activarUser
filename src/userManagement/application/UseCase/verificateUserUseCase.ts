import { User } from "../../domain/Entity/user";
import { UserInterface } from "../../domain/Port/userInterface";
import { Status } from "../../domain/Entity/status";

export class VerificateUserUseCase{

    constructor( readonly userInterface:UserInterface ){}

    async update (token:string):Promise<User | any| null| string>{
        try {
        
            let tokenVeri = await this. userInterface.verificateUser(token);
            return tokenVeri;
        } catch (error){
            return null;
        }
    }   
}