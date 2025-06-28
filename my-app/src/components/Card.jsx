import './Card.css';
import { useState } from 'react';
import { useEffect } from 'react';
import CardLyrics from './CardLyrics.jsx';
import CardFunctionality from './CardFunctionality.jsx';

export default function Card({ title, text, viewOnly, getSelectedCards }) {
  const [checkboxState, setCheckboxState] = useState(false);
  const [isEditing, setIsEditing] = useState();
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const [previousTitle, setPreviousTitle] = useState(title);
  const [previousText, setPreviousText] = useState(text);

  function checkChange(event) {
    const isChecked = event.target.checked;
    setCheckboxState(isChecked);
    getSelectedCards(isChecked);
  }

  function editCard() {
    setIsEditing(true);
    if (checkboxState) {
      setCheckboxState(false);
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
    <div className="card" style={{ backgroundColor: checkboxState ? '#a63d40' : 'white' }}>
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
      />
    </div>
  );
}
