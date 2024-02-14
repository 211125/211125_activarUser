import { Pool } from "pg";
import { Signale } from "signale";

const signale = new Signale();

const config = {
    user: 'angelito',
    host: 'localhost',
    database: 'matenimientoC2',
    password: '211125',
    port: 5432, // Puerto predeterminado de PostgreSQL
    max: 10, // Número máximo de conexiones en el pool
};

// Crear el pool de conexiones
const pool = new Pool(config);

export async function query(sql: string, params?: any[]) {
    try {
        const client = await pool.connect();
        signale.success("Conexión exitosa a la BD");

        // Utiliza el método query del cliente para ejecutar consultas
        const result = await client.query(sql, params);

        // Libera el cliente de vuelta al pool
        client.release();

        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}