import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(
        private configService: ConfigService
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAILER_HOST'),
            port: this.configService.get<number>('MAILER_PORT'),
            auth: {
                user: this.configService.get<string>('MAILER_USER'),
                pass: this.configService.get<string>('MAILER_PASSWORD'),
            },
        });
    }

    async sendConfirmationEmail(email: string, confirmationToken: string): Promise<any> {
        const confirmationUrl = `${this.configService.get('CONFIRMATION_URL')}${confirmationToken}`;
        const mailOptions = {
            from: this.configService.get('EMAIL_FROM'),
            to: email,
            subject: 'Confirma tu dirección de correo electrónico',
            html: `
                <p>Por favor, haz clic en el siguiente enlace para confirmar tu dirección de correo electrónico:</p>
                <p><a href="${confirmationUrl}">Confirmar mi correo electrónico</a></p>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return {
                status: true,
                message: 'Correo electrónico enviado correctamente'
            }
        } catch (error) {
            return {
                status: false,
                message: 'Error al enviar el correo electrónico',
                error
            }
        }
    }
}
