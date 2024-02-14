import { Contact } from "./contact";
import { Credential } from "./credential";
import { Status } from "./status";
import { v4 as uuid } from "uuid";

export class User{

    public uuid:string;
    public contact : Contact;
    public credential: Credential;
    public status : Status;

    constructor(
        contact:Contact,
        credentials : Credential,
        status: Status
    ){
        
        this.uuid = this.generateUuid();
        this.contact = contact;
        this.credential = credentials;
        this.status = status;   

    }
    generateUuid():string{
        const miuuid = uuid(); // genera el uuid del usuario
        return miuuid;
    }
}