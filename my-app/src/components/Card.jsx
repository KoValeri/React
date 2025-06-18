import "./Card.css";
import { useState } from "react";

export default function Card({ title, text }) {
  const [checkboxState, setCheckboxState] = useState(false);
  const [isEditing, setIsEditing] = useState();
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const [previousTitle, setPreviousTitle] = useState(title);
  const [previousText, setPreviousText] = useState(text);

  function checkChange(event) {
    setCheckboxState(event.target.checked);
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

  return (
    <div
      className="card"
      style={{ backgroundColor: checkboxState ? "#a63d40" : "white" }}
    >
      {isEditing ? (
        <div className="editing">
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <textarea
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          ></textarea>
        </div>
      ) : (
        <div>
          <h2 className="song-name">{newTitle}</h2>
          <p className="song-text">{newText}</p>
        </div>
      )}
      {!isEditing && (
        <div className="ch-box">
          <input type="checkbox" onChange={checkChange} />
          <label>Click me!</label>
        </div>
      )}
      <div
        className="edit"
        style={{ margin: isEditing ? "82px 0px 0px 0px" : "40px 0px 0px 0px" }}
      >
        {isEditing ? (
          <>
            <button className="save-button" onClick={saveEditedCard}>
              Save
            </button>
            <button className="exit-button" onClick={exitFromEditing}>
              Exit
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={editCard}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
