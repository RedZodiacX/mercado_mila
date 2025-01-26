const express = require('express');
const { sendEmail } = require('../utils/mail'); // Función para enviar correos

const router = express.Router();

router.post('/send', async (req, res) => {
    const { items, email } = req.body;

    if (!items || !email) {
        return res.status(400).json({ error: 'Los items y el correo son obligatorios' });
    }

    try {
        await sendEmail(items, email);
        res.status(200).json({ message: 'Correo enviado con éxito' });
    } catch (error) {
        console.error('Error enviando el correo:', error);
        res.status(500).json({ error: 'Error enviando el correo' });
    }
});

module.exports = router;
