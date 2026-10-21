import EventRow from './EventRow.jsx';

const EventTable = ({ events, onDelete, onUpdate }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Sự kiện</th>
                    <th>Địa điểm</th>
                    <th>Ngày</th>
                    <th>Số chỗ</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {events.map(ev => (
                    <EventRow key={ev.id} event={ev} onDelete={onDelete} onUpdate={onUpdate} />
                ))}
            </tbody>
        </table>
    );
};

export default EventTable;