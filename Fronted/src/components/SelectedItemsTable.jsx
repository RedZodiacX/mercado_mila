import React from 'react';

function SelectedItemsTable({ selectedItems }) {
    if (!selectedItems || selectedItems.length === 0) {
        return <p>No items selected</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                {selectedItems.map((item) => (
                    <tr key={item.code}>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.weight}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SelectedItemsTable;
