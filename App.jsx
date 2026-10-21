import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import EventList from './pages/EventList.jsx';
import AddEvent from './pages/AddEvent.jsx';
import EventDetail from './pages/EventDetail.jsx';

const App = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('gk_events');
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem('gk_events');
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gk_events');
    if (saved) return;

    const controller = new AbortController();

    axios.get('/data/events.json', { signal: controller.signal })
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_events', JSON.stringify(events));
    }
  }, [events, loading]);

  const addEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(item => item.id !== id));
  };

  const updateEvent = (updatedItem) => {
    setEvents(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home events={events} />} />
        <Route path="events" element={<EventList events={events} onDelete={deleteEvent} onUpdate={updateEvent} />} />
        <Route path="events/new" element={<AddEvent events={events} onAdd={addEvent} />} />
        <Route path="events/:id" element={<EventDetail events={events} />} />
      </Route>
    </Routes>
  );
};

export default App;