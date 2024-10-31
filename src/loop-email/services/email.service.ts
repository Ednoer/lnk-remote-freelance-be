import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;
    private emailSender: string;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get<string>('EMAIL_SENDER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD')
            },
        });

        this.emailSender = this.configService.get<string>('EMAIL_SENDER')
    }

    async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
        const mailOptions = {
            from: this.emailSender,
            to,
            subject,
            text,
            html,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}
