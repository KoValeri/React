import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const count = useSelector(state => state.song.count);

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
