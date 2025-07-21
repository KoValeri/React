import './Card.css';
import PropTypes from 'prop-types';

export default function CardFunctionality({
  checkChange,
  isEditing,
  viewOnly,
  saveEditedCard,
  exitFromEditing,
  editCard,
  id,
  isChecked,
}) {
  return (
    <>
      {!isEditing && (
        <div className="ch-box">
          <input
            id={`card-checkbox-${id}`}
            type="checkbox"
            onChange={checkChange}
            checked={isChecked}
          />
          <label for={`card-checkbox-${id}`}>Choose me!</label>
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

CardFunctionality.propTypes = {
  checkChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  viewOnly: PropTypes.bool,
  saveEditedCard: PropTypes.func.isRequired,
  exitFromEditing: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
};
