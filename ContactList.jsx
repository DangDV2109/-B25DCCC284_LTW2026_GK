import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ContactTable from '../components/ContactTable';

const ContactList = ({ contacts, onDelete, onToggleFavorite }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('Tất cả');

    const filteredContacts = contacts.filter((contact) => {
        const matchesGroup = selectedGroup === 'Tất cả' || contact.group === selectedGroup;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            contact.name.toLowerCase().includes(searchLower) ||
            contact.phone.toLowerCase().includes(searchLower);
        return matchesGroup && matchesSearch;
    });

    return (
        <div>
            <h2>Danh sách liên hệ</h2>
            <FilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedGroup={selectedGroup}
                onGroupChange={setSelectedGroup}
            />

            <p>Tìm thấy {filteredContacts.length} liên hệ</p>

            {filteredContacts.length === 0 ? (
                <p>Không có dữ liệu</p>
            ) : (
                <ContactTable
                    contacts={filteredContacts}
                    onDelete={onDelete}
                    onToggleFavorite={onToggleFavorite}
                />
            )}
        </div>
    );
};

export default ContactList;