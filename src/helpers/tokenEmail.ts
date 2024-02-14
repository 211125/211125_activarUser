import jwt, { JwtPayload } from 'jsonwebtoken';



export function generarToken(email) {
    const token = jwt.sign({ email }, 'secreto');
    return token;
}; 

// Función para verificar un token
export function verificateToken(token: string): string | null {
    try {
        const decoded = jwt.verify(token, 'secreto') as JwtPayload;
        if (decoded && typeof decoded.email === 'string') {
            return decoded.email;
        } else {
            return null;
        }
    } catch (error) {
        // Manejar el error en caso de que el token no sea válido
        console.error('Error al verificar el token:', error.message);
        return null;
    }
}