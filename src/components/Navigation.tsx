import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h3 className="font-bold">Github Search</h3>

      <span>
        <NavLink
          to="/"
          className="mr-4"
          style={({ isActive }) => ({ opacity: isActive ? 0.6 : 1 })}
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          style={({ isActive }) => ({ opacity: isActive ? 0.6 : 1 })}
        >
          Favorites
        </NavLink>
      </span>
    </nav>
  );
}

export default Navigation;
