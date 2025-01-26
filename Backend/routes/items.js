const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// Obtener todos los items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        console.error('Error al obtener los items:', err);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
});

// Agregar un nuevo item
router.post('/', async (req, res) => {
    const { code, name, quantity, weight } = req.body;

    if (!code || !name || !quantity || !weight) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const existingItem = await Item.findOne({ code });
        if (existingItem) {
            return res.status(400).json({ error: 'El código ya existe' });
        }

        const newItem = new Item({ code, name, quantity, weight });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error('Error al agregar el item:', err);
        res.status(500).json({ error: 'Error al agregar el item' });
    }
});

// Eliminar un item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }

        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item eliminado' });
    } catch (err) {
        console.error('Error al eliminar el item:', err);
        res.status(500).json({ error: 'Error al eliminar el item' });
    }
});

module.exports = router;
