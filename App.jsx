import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // 1. Tải dữ liệu từ LocalStorage hoặc API với AbortController
    useEffect(() => {
        const saved = localStorage.getItem('gk_contacts');
        if (saved) {
            try {
                setContacts(JSON.parse(saved));
                setLoading(false);
                return;
            } catch (err) {
                console.error(err);
            }
        }

        const controller = new AbortController();
        axios
            .get('/data/contacts.json', { signal: controller.signal })
            .then((res) => {
                setContacts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError(true);
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, []);

    // 2. Lưu dữ liệu vào LocalStorage khi contacts thay đổi và đã tải xong
    useEffect(() => {
        if (!loading && !error) {
            localStorage.setItem('gk_contacts', JSON.stringify(contacts));
        }
    }, [contacts, loading, error]);

    const handleDelete = (id) => {
        setContacts(contacts.filter((c) => Number(c.id) !== Number(id)));
    };

    const handleToggleFavorite = (id) => {
        setContacts(
            contacts.map((c) =>
                Number(c.id) === Number(id) ? { ...c, favorite: !c.favorite } : c
            )
        );
    };

    const handleAdd = (newContact) => {
        setContacts([...contacts, newContact]);
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Không tải được dữ liệu</p>;

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home contacts={contacts} />} />
                <Route
                    path="contacts"
                    element={
                        <ContactList
                            contacts={contacts}
                            onDelete={handleDelete}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    }
                />
                <Route
                    path="contacts/new"
                    element={<AddContact contacts={contacts} onAdd={handleAdd} />}
                />
                <Route
                    path="contacts/:id"
                    element={<ContactDetail contacts={contacts} />}
                />
            </Route>
        </Routes>
    );
};

export default App;