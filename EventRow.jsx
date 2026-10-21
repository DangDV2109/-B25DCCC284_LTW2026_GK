
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/events/') && location.pathname !== '/events/new' && location.pathname !== '/events';

  return (
    <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <NavLink to="/" end className={({ isActive }) => (isDetail ? '' : isActive ? 'active' : '')}>
        Trang chủ
      </NavLink>
      <NavLink to="/events" className={({ isActive }) => (isDetail ? '' : isActive ? 'active' : '')}>
        Danh sách
      </NavLink>
      <NavLink to="/events/new" className={({ isActive }) => (isDetail ? '' : isActive ? 'active' : '')}>
        Thêm mới
      </NavLink>
    </nav>
  );
};

export default NavBar;