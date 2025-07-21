import './Card.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import CardLyrics from './CardLyrics.jsx';
import CardFunctionality from './CardFunctionality.jsx';
import { SongContext } from '../../app_context/song-context.jsx';

export default function Card({ id, title, text, isChecked }) {
  const { viewOnly, updateSelectedCard } = useContext(SongContext);

  const [isEditing, setIsEditing] = useState();
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const [previousTitle, setPreviousTitle] = useState(title);
  const [previousText, setPreviousText] = useState(text);

  function checkChange(event) {
    updateSelectedCard(id, event.target.checked);
  }

  function editCard() {
    setIsEditing(true);
    if (isChecked) {
      updateSelectedCard(id, false);
    }
  }

  function saveEditedCard() {
    setIsEditing(false);
    setPreviousTitle(newTitle);
    setPreviousText(newText);
  }

  function exitFromEditing() {
    setNewTitle(previousTitle);
    setNewText(previousText);
    setIsEditing(false);
  }

  useEffect(() => {
    if (viewOnly && isEditing) {
      setIsEditing(false);
      setNewTitle(previousTitle);
      setNewText(previousText);
    }
  }, [viewOnly, isEditing, previousTitle, previousText]);

  return (
    <div className="card" style={{ backgroundColor: isChecked ? '#a63d40' : 'white' }}>
      <CardLyrics
        isEditing={isEditing}
        newTitle={newTitle}
        newText={newText}
        setNewTitle={setNewTitle}
        setNewText={setNewText}
      />
      <CardFunctionality
        checkChange={checkChange}
        isEditing={isEditing}
        viewOnly={viewOnly}
        saveEditedCard={saveEditedCard}
        exitFromEditing={exitFromEditing}
        editCard={editCard}
        id={id}
        isChecked={isChecked}
      />
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
