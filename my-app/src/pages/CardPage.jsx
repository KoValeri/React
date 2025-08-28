import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../components/Card/Card.css';
import './CardPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { songActions } from '../store/song';

export default function CardPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    song: { songs },
    view: { viewOnly },
  } = useSelector(state => state);
  const song = songs.find(s => String(s.id) === id);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [previousTitle, setPreviousTitle] = useState('');
  const [previousText, setPreviousText] = useState('');

  useEffect(() => {
    if (song) {
      setNewTitle(song.title);
      setNewText(song.text);
      setPreviousTitle(song.title);
      setPreviousText(song.text);
    }
  }, [song]);

  if (!song && songs.length !== 0) {
    throw new Response('Not Found', { status: 404 });
  }

  function editCardHandler() {
    setIsEditing(true);
  }

  function saveEditedCardHandler() {
    setIsEditing(false);
    setPreviousTitle(newTitle);
    setPreviousText(newText);
    dispatch(songActions.saveEditedCard({ id: song.id, newTitle, newText }));
  }

  function exitFromEditingHandler() {
    setNewTitle(previousTitle);
    setNewText(previousText);
    setIsEditing(false);
  }

  return (
    <div className="card-block">
      <div className="the-card">
        {isEditing ? (
          <div className="editing">
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <textarea value={newText} onChange={e => setNewText(e.target.value)}></textarea>
          </div>
        ) : (
          <div>
            <h2 className="the-card-song-name">{newTitle}</h2>
            <p className="the-card-song-text">{newText}</p>
          </div>
        )}

        <div
          className="edit"
          style={{
            margin: isEditing ? '146px 0px 0px 0px' : '82px 0px 0px 0px',
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
            <button className="edit-button" onClick={editCardHandler} disabled={viewOnly}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
