const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// Configuración de OAuth2
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Establece el refresh_token
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(items, recipientEmail) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const htmlTable = `
            <table border="1">
                <tr><th>Código</th><th>Nombre</th><th>Cantidad</th><th>Peso</th></tr>
                ${items.map(
            (item) => `
                    <tr>
                        <td>${item.code}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.weight}</td>
                    </tr>`
        ).join('')}
            </table>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: 'Items Seleccionados',
            html: htmlTable,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', result);
        return result;
    } catch (error) {
        console.error('Error enviando el correo:', error);
        throw new Error('Error enviando el correo');
    }
}

module.exports = { sendEmail };
