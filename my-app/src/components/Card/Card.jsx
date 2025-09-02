import './Card.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CardLyrics from './CardLyrics.jsx';
import CardFunctionality from './CardFunctionality.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { songActions } from '../../store/song.js';

export default function Card({ id, title, text, isChecked }) {
  const dispatch = useDispatch();
  const viewOnly = useSelector(state => state.view.viewOnly);

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState();
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const [previousTitle, setPreviousTitle] = useState(title);
  const [previousText, setPreviousText] = useState(text);

  function checkChange(event) {
    dispatch(songActions.updateSelectedCard({ id, isChecked: event.target.checked }));
  }

  function editCardHandler() {
    setIsEditing(true);
    if (isChecked) {
      dispatch(songActions.updateSelectedCard({ id, isChecked: false }));
    }
  }

  function saveEditedCardHandler() {
    setIsEditing(false);
    setPreviousTitle(newTitle);
    setPreviousText(newText);
    dispatch(songActions.saveEditedCard({ id, newTitle, newText }));
  }

  function exitFromEditingHandler() {
    setNewTitle(previousTitle);
    setNewText(previousText);
    setIsEditing(false);
  }

  function handleDoubleClick() {
    if (!isEditing) {
      navigate(`/card/${id}`);
    }
  }

  return (
    <div
      className="card"
      style={{ backgroundColor: isChecked ? '#a63d40' : 'white' }}
      onDoubleClick={handleDoubleClick}
    >
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
        saveEditedCardHandler={saveEditedCardHandler}
        exitFromEditingHandler={exitFromEditingHandler}
        editCardHandler={editCardHandler}
        id={id}
        isChecked={isChecked}
      />
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isChecked: PropTypes.bool.isRequired,
};
