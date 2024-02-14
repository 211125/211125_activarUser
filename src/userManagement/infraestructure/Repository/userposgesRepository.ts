import { User } from "../../domain/Entity/user";
import { UserInterface } from "../../domain/Port/userInterface";
import { query } from "../../../database/pg";
import { verificateToken } from "../../../helpers/tokenEmail";

export class UserMysqlRepository  implements UserInterface{
    async registerUser(user: User): Promise<any> {
        try {
            const { contact, credential, status } = user;
            
            // Insertar los datos del usuario en la base de datos
            const sql = "INSERT INTO Users (uuid, name, lastName, cellphone, email, password, activationToken, verifiedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
            const params = [
                user.uuid,
                contact.name,
                contact.lastName,
                contact.cellphone,
                credential.email,
                credential.password,
                status.activationToken,
                status.verifiedAt
            ];
    
            await query(sql, params);
    
            return user;
        } catch (error) {
            console.error("Error al registrar usuario en PostgreSQL:", error);
            throw new Error("Error al registrar usuario en PostgreSQL");
        }
    }
    
    async verificateUser(token: string): Promise<string> {
        try {
            // Verificar el token
            const email = verificateToken(token);
    
            if (email) {
                // Si el token es válido, buscar el usuario por el token en la base de datos
                const sql = "UPDATE Users SET verifiedAt = NOW() WHERE activationToken = $1";
                const params = [token];
                const result = await query(sql, params);
                
                if (result instanceof Array && result.length > 0 && result[0] instanceof Object) {
                    const affectedRows = result[0]['affectedRows']; 
    
                    if (affectedRows && typeof affectedRows === 'number' && affectedRows > 0) {
                        // Si se encontró y actualizó el usuario, retornar un mensaje de confirmación
                        return "Usuario confirmado correctamente.";
                    }
                }
            }
            // El token no es válido o el usuario no se encontró, retornar un mensaje de error
            return "No se pudo confirmar el usuario.";
        } catch (error) {
            console.error("Error al verificar usuario en PostgreSQL:", error);
            throw new Error("Error al verificar usuario en PostgreSQL");
        }
    }
    
}