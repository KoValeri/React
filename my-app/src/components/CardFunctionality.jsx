import './Card.css';

export default function CardFunctionality({
  checkChange,
  isEditing,
  viewOnly,
  saveEditedCard,
  exitFromEditing,
  editCard,
}) {
  return (
    <>
      {!isEditing && (
        <div className="ch-box">
          <input type="checkbox" onChange={checkChange} />
          <label>Choose me!</label>
        </div>
      )}
      {!viewOnly && (
        <div
          className="edit"
          style={{
            margin: isEditing ? '82px 0px 0px 0px' : '40px 0px 0px 0px',
          }}
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
      )}
    </>
  );
}
