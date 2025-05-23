
import nodemailer from 'nodemailer';
import path from 'path';

interface EmailData {
    recipient: string;
    subject: string;
    text: string;
}

const sendEmail = async ({ recipient, subject, text }: EmailData): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: 'seedsfeedsindia@gmail.com',
            // pass: 'jsmjhxlchodmzlar'
            user: 'kashyap.seedsnfeeds@gmail.com',
            pass: 'fshwybohgyfaumts'
        },
    });

    const mailOptions = {
        from: 'kashyap.seedsnfeeds@gmail.com',
        to: recipient,
        subject: subject,
        html: `${text}`,
        attachments: [{
            filename: 'contract.pdf',
            path: path.resolve(process.cwd(), 'public', 'pdf', 'contract.pdf')
        }]
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return true; // Email sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Email sending failed
    }
};

export { sendEmail };