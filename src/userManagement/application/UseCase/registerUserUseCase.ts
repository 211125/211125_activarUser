import { Contact } from "../../domain/Entity/contact";
import { Credential} from "../../domain/Entity/credential";
import { Status } from "../../domain/Entity/status";
import { User } from "../../domain/Entity/user";
import { UserInterface } from "../../domain/Port/userInterface";
import { generarToken } from "../../../helpers/tokenEmail";
import { encrypt } from "../../../helpers/ashs";

export class RegisterUserUseCase {

    constructor(readonly userInterface : UserInterface){}

   

    async run( { name, lastName , cellphone, email, password} ):Promise<User | any | null> {

        const token = generarToken(email); //genere el token unico y lo firma con el correo proporcionado
        const hashPassword = await encrypt(password); // se encripta la contraseña
        try {   
            let contac = new Contact (name, lastName, cellphone);
            let credential = new Credential (email, hashPassword);
            let status = new Status(token, null);

            let user = new User(
                contac,
                credential,
                status
            );

            return await this.userInterface.registerUser(user);

        } catch (error) {
            return null;
        }
    }
}