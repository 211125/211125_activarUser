import { User } from "../../domain/Entity/user";

export interface EmailPort{

    run(use:User):Promise<void>;
}