import Card from '../Card/Card.jsx';
import WithLoadingDelay from '../Loading/WithLoadingDelay.jsx';
import '../../App.css';
import { useSelector } from 'react-redux';

const CardWithLoading = WithLoadingDelay(Card);

export default function CardList() {
  const songs = useSelector(state => state.song.songs);

  return (
    <div className="cards">
      {songs.map(songCard => (
        <CardWithLoading key={songCard.id} id={songCard.id} {...songCard} />
      ))}
    </div>
  );
}
