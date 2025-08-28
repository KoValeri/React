import '../../App.css';
import { useDispatch } from 'react-redux';
import { songActions } from '../../store/song.js';

export default function WorkWithCards() {
  const dispatch = useDispatch();

  function addCardHandler() {
    dispatch(songActions.addCard());
  }

  function deleteSelectedCardsHandler() {
    dispatch(songActions.deleteSelectedCards());
  }

  return (
    <div className="buttons">
      <div>
        <button className="add-card" onClick={addCardHandler}>
          Add card
        </button>
      </div>
      <div>
        <button className="delete-button" onClick={deleteSelectedCardsHandler}>
          Delete
        </button>
      </div>
    </div>
  );
}
