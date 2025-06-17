import "./Card.css";
import { useState } from "react";

export default function Card({ title, text }) {
  const [checkboxState, setCheckboxState] = useState(false);
  const [isEditing, setIsEditing] = useState();
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);

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
  }

  function exitFromEditing() {
    setNewTitle(title);
    setNewText(text);
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
      <div className="ch-box" style={{ display: isEditing ? "none" : "flex" }}>
        <input type="checkbox" onChange={checkChange}></input>
        <label>Click me!</label>
      </div>
      <div
        className="edit"
        style={{ margin: isEditing ? "82px 0px 0px 0px" : "40px 0px 0px 0px" }}
      >
        <button
          className="save-button"
          style={{ display: isEditing ? "flex" : "none" }}
          onClick={saveEditedCard}
        >
          Save
        </button>
        <button
          className="exit-button"
          style={{ display: isEditing ? "flex" : "none" }}
          onClick={exitFromEditing}
        >
          Exit
        </button>
        <button
          className="edit-button"
          style={{ display: isEditing ? "none" : "flex" }}
          onClick={editCard}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
