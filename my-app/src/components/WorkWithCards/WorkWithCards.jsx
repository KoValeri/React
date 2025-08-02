import '../../App.css';
import { SongContext } from '../../app_context/song-context.jsx';
import { useContext } from 'react';
import ViewOnlyCheckbox from './ViewOnlyCheckbox.jsx';

export default function WorkWithCards() {
  const { deleteSelectedCards, addCard } = useContext(SongContext);

  return (
    <div className="buttons">
      <ViewOnlyCheckbox />
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
  );
}
