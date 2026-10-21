import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            <NavLink to="/" end>Trang chủ</NavLink>
            <NavLink to="/contacts" end>Danh sách</NavLink>
            <NavLink to="/contacts/new" end>Thêm mới</NavLink>
        </nav>
    );
};

export default NavBar;