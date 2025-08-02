import './Header.css';
import { SongContext } from '../../app_context/song-context.jsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const { count } = useContext(SongContext);

  return (
    <header className="app-header">
      <div style={{ width: '273px' }}>
        <div className="card-badge">
          <strong>Number of cards</strong>
          <span className="badge">{count}</span>
        </div>
      </div>
      <div className="header-title">
        <h1>Song cards</h1>
      </div>

      <nav className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
