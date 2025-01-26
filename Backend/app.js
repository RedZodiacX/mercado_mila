require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemsRoutes = require('./routes/items'); // Rutas para items
const mailRoutes = require('./routes/mail'); // Rutas para enviar correos

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Registrar rutas
app.use('/api/items', itemsRoutes);
app.use('/api/mail', mailRoutes); // Rutas para correos

// Ruta base
app.get('/', (req, res) => res.send('API funcionando'));

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
