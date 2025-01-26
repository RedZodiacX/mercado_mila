import React, { useState, useEffect } from 'react';
import { getItems } from '../services/api';

const ItemList = ({ onSelect }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getItems();
            setItems(data);
        };
        fetchItems();
    }, []);

    const handleCheck = (item) => {
        onSelect(item);
    };

    return (
        <ul>
            {items.map((item) => (
                <li key={item._id}>
                    <input type="checkbox" onChange={() => handleCheck(item)} />
                    {item.name} - {item.quantity} - {item.weight}
                </li>
            ))}
        </ul>
    );
};

export default ItemList;
