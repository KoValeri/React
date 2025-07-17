import './Header.css';
import { SongContext } from '../app_context/song-context.jsx';
import { useContext } from 'react';

export default function Header() {
  const { count } = useContext(SongContext);

  return (
    <header className="app-header">
      <div className="card-badge">
        <strong>Number of cards</strong>
        <span class="badge">{count}</span>
      </div>
      <div className="header-title">
        <h1>Song cards</h1>
      </div>
    </header>
  );
}
