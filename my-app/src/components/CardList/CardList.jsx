import Card from '../Card/Card.jsx';
import WithLoadingDelay from '../Loading/WithLoadingDelay.jsx';
import '../../App.css';
import { SongContext } from '../../app_context/song-context.jsx';
import { useContext } from 'react';

const CardWithLoading = WithLoadingDelay(Card);

export default function CardList() {
  const { songs } = useContext(SongContext);

  return (
    <div className="cards">
      {songs.map(songCard => (
        <CardWithLoading key={songCard.id} id={songCard.id} {...songCard} />
      ))}
    </div>
  );
}
