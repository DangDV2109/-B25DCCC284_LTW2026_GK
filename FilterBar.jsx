import { Link } from 'react-router-dom';

const EventRow = ({ event, onDelete, onUpdate }) => {
  const { id, name, location, date, capacity, registered } = event;
  const isFull = registered >= capacity;

  const handleRegister = () => {
    if (!isFull) {
      onUpdate({ ...event, registered: registered + 1 });
    }
  };

  return (
    <tr>
      <td>
        <Link to={`/events/${id}`}>{name}</Link>
      </td>
      <td>{location}</td>
      <td>{date}</td>
      <td className={isFull ? 'full-event' : ''}>
        {registered}/{capacity} {isFull && 'Sự kiện đã đầy'}
      </td>
      <td>
        <button onClick={handleRegister} disabled={isFull}>Đăng ký</button>
        <button onClick={() => onDelete(id)} style={{ marginLeft: '5px' }}>Xóa</button>
      </td>
    </tr>
  );
};

export default EventRow;