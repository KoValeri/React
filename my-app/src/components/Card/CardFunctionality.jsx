import './Card.css';
import PropTypes from 'prop-types';

export default function CardFunctionality({
  checkChange,
  isEditing,
  viewOnly,
  saveEditedCardHandler,
  exitFromEditingHandler,
  editCardHandler,
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
          <label htmlFor={`card-checkbox-${id}`}>Choose me!</label>
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
              <button className="save-button" onClick={saveEditedCardHandler}>
                Save
              </button>
              <button className="exit-button" onClick={exitFromEditingHandler}>
                Exit
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={editCardHandler}>
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
  saveEditedCardHandler: PropTypes.func.isRequired,
  exitFromEditingHandler: PropTypes.func.isRequired,
  editCardHandler: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
