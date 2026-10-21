import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GROUPS } from '../data';

const AddContact = ({ contacts, onAdd }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [group, setGroup] = useState(GROUPS[1]); // Mặc định 'Bạn bè'
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Kiểm tra ô trống
        if (!name.trim() || !phone.trim() || !email.trim()) {
            setErrorMsg('Vui lòng nhập đầy đủ thông tin phía dưới form');
            return;
        }

        // 2. Kiểm tra số điện thoại (đúng 10 chữ số, bắt đầu bằng số 0)
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phone)) {
            setErrorMsg('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0');
            return;
        }

        // 3. Kiểm tra email có chứa ký tự @
        if (!email.includes('@')) {
            setErrorMsg('Email không hợp lệ');
            return;
        }

        const maxId = contacts.length > 0 ? Math.max(...contacts.map((c) => Number(c.id))) : 0;
        const newContact = {
            id: maxId + 1,
            name,
            phone,
            email,
            group,
            favorite: false,
        };

        onAdd(newContact);
        navigate('/contacts', { replace: true });
    };

    return (
        <div>
            <h2>Thêm liên hệ mới</h2>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="name">Họ tên</label><br />
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="phone">Số điện thoại</label><br />
                    <input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email</label><br />
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="group">Nhóm</label><br />
                    <select
                        id="group"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                    >
                        {GROUPS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
};

export default AddContact;