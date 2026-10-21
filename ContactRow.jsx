import React from 'react';
import { Link } from 'react-router-dom';

const ContactRow = ({ contact, onDelete, onToggleFavorite }) => {
    const { id, name, phone, email, group, favorite } = contact;

    return (
        <tr style={{ backgroundColor: favorite ? '#fff9c4' : 'transparent' }}>
            <td>
                <Link to={`/contacts/${id}`}>{name}</Link>
            </td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{group}</td>
            <td>
                <button onClick={() => onToggleFavorite(id)} style={{ marginRight: '5px' }}>
                    {favorite ? 'Bỏ yêu thích' : 'Yêu thích'}
                </button>
                <button onClick={() => onDelete(id)}>Xóa</button>
            </td>
        </tr>
    );
};

export default ContactRow;