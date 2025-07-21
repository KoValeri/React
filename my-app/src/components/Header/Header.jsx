import './Header.css';
import { SongContext } from '../../app_context/song-context.jsx';
import { useContext } from 'react';

export default function Header() {
  const { count, deleteSelectedCards, addCard, checkView } = useContext(SongContext);

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

      <div className="buttons">
        <div className="view-only">
          <input id="view-only-checkbox" type="checkbox" onChange={checkView} />
          <label for="view-only-checkbox">View only</label>
        </div>
        <div>
          <button className="add-card" onClick={addCard}>
            Add card
          </button>
        </div>
        <div>
          <button className="delete-button" onClick={deleteSelectedCards}>
            Delete
          </button>
        </div>
      </div>
    </header>
  );
}
