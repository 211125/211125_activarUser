import { User } from "../../domain/Entity/user";
import { EmailPort } from "./emailPort";
import { Resend } from 'resend';

export class EmailService implements EmailPort {
    private resend: Resend;
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.resend = new Resend(apiKey);
    }

    async run(user: User): Promise<void> {
        try {
            const { contact, status, credential } = user;
            const confirmationLink = `http://localhost:3001/api/v1/users/${status.activationToken}/activate`;

            const { data, error } = await this.resend.emails.send({
                from: 'DevOps <onboarding@resend.dev>',
                to: [credential.email],
                subject: 'Confirmación de correo electrónico',
                html: `
                    <p>Hola ${contact.getFullName()},</p>
                    <p>Por favor, haz clic en el siguiente enlace para confirmar tu correo electrónico:</p>
                    <p><a href="${confirmationLink}">Confirmar correo electrónico</a></p>
                `,
            });

            if (error) {
                console.error('Error al enviar el correo de confirmación:', error);
                throw new Error('Error al enviar el correo de confirmación');
            }

            console.log('Correo de confirmación enviado correctamente');
        } catch (error) {
            console.error('Error al ejecutar EmailService:', error);
            throw error;
        }
    }
}
