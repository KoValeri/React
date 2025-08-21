import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../components/Card/Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { songActions } from '../store/song';

export default function CardPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const songs = useSelector(state => state.song.songs);
  const song = songs.find(s => String(s.id) === id);
  const viewOnly = useSelector(state => state.view.viewOnly);

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

  let disabledButton = false;
  if (viewOnly) {
    disabledButton = true;
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ width: '450px', height: '366px', padding: '20px' }}>
        {isEditing ? (
          <div className="editing">
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <textarea value={newText} onChange={e => setNewText(e.target.value)}></textarea>
          </div>
        ) : (
          <div>
            <h2 className="song-name" style={{ fontSize: '32px' }}>
              {newTitle}
            </h2>
            <p className="song-text" style={{ fontSize: '18px', height: '222px' }}>
              {newText}
            </p>
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
            <button className="edit-button" onClick={editCardHandler} disabled={disabledButton}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
