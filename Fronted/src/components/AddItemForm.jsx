import React, { useState } from 'react';
import { addItem } from '../services/api';

const AddItemForm = () => {
    const [item, setItem] = useState({ code: '', name: '', quantity: '', weight: '' });

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addItem(item);
        setItem({ code: '', name: '', quantity: '', weight: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="code" value={item.code} onChange={handleChange} placeholder="Código" required />
            <input name="name" value={item.name} onChange={handleChange} placeholder="Nombre" required />
            <input name="quantity" value={item.quantity} onChange={handleChange} placeholder="Cantidad" type="number" required />
            <input name="weight" value={item.weight} onChange={handleChange} placeholder="Peso" type="number" required />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default AddItemForm;
