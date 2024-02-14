import { User } from "../Entity/user";

export interface UserInterface{

    registerUser(user:User):Promise<User|any | null>;

    verificateUser(token:string):Promise<User | any | null | string>;






    
}