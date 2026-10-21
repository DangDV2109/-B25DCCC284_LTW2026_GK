import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = ({ contacts }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const contactId = Number(id);
    const contact = contacts.find((c) => Number(c.id) === contactId);

    const [isCalling, setIsCalling] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer;
        if (isCalling) {
            timer = setInterval(() => {
                setSeconds((s) => s + 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isCalling]);

    if (!contact || Number.isNaN(contactId)) {
        return (
            <div>
                <p>Không tìm thấy liên hệ</p>
                <button onClick={() => navigate(-1)}>Quay lại</button>
            </div>
        );
    }

    const { name, phone, email, group, favorite } = contact;

    return (
        <div>
            <h2>Chi tiết liên hệ</h2>
            <p>Họ tên: {name}</p>
            <p>Số điện thoại: {phone}</p>
            <p>Email: {email}</p>
            <p>Nhóm: {group}</p>
            <p>Yêu thích: {favorite ? 'Có' : 'Không'}</p>

            <div style={{ margin: '15px 0' }}>
                {!isCalling ? (
                    <button onClick={() => { setSeconds(0); setIsCalling(true); }}>Gọi</button>
                ) : (
                    <div>
                        <p>Đang gọi... {seconds} giây</p>
                        <button onClick={() => setIsCalling(false)}>Kết thúc</button>
                    </div>
                )}
                {seconds > 0 && !isCalling && (
                    <p>Cuộc gọi kết thúc sau {seconds} giây</p>
                )}
            </div>

            <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
    );
};

export default ContactDetail;