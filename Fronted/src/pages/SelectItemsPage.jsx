import React, { useState } from 'react';
import ItemList from '../components/ItemList';
import { sendMail } from '../services/api';

const SelectItemsPage = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [email, setEmail] = useState('');

    const handleSelect = (item) => {
        setSelectedItems(prev => [...prev, item]);
    };

    const handleSend = async () => {
        await sendMail(selectedItems, email);
        alert('Correo enviado con éxito');
    };

    return (
        <div>
            <h1>Seleccionar Items</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
            />
            <ItemList onSelect={handleSelect} />
            <button onClick={handleSend}>Enviar Seleccionados</button>
        </div>
    );
};

export default SelectItemsPage;
