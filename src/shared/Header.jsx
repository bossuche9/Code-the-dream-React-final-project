import { NavLink } from 'react-router';
function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/about'}>About</NavLink>
      </nav>
    </header>
  );
}

export default Header;
