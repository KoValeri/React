import './Card.css';
import PropTypes from 'prop-types';

export default function CardLyrics({ isEditing, newTitle, newText, setNewTitle, setNewText }) {
  return (
    <>
      {isEditing ? (
        <div className="editing">
          <input type="text" value={newTitle} onChange={event => setNewTitle(event.target.value)} />
          <textarea value={newText} onChange={event => setNewText(event.target.value)}></textarea>
        </div>
      ) : (
        <div>
          <h2 className="song-name">{newTitle}</h2>
          <p className="song-text">{newText}</p>
        </div>
      )}
    </>
  );
}

CardLyrics.propTypes = {
  isEditing: PropTypes.bool,
  newTitle: PropTypes.string.isRequired,
  newText: PropTypes.string.isRequired,
  setNewTitle: PropTypes.func.isRequired,
  setNewText: PropTypes.func.isRequired,
};
