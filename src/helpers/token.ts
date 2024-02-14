import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();


interface TokenPayload {
    uuid: string;
    email: string;
}

let clavetoken ="EjemploSecretKey$12345";

export const tokenSigIn = (uuid:string, email:string ): string => {
    return jwt.sign(
        {
            uuid: uuid,
            email: email
        },
        process.env.KEY_TOKEN! || clavetoken!,
        {
            expiresIn: '74h'
        }
    );
}

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, process.env.KEY_TOKEN! ||clavetoken! ) as TokenPayload;
    } catch (error) {
        return null;
    }
}

