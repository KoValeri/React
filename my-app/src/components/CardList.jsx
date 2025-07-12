import Card from './Card.jsx';
import WithLoadingDelay from './WithLoadingDelay.jsx';
import '../App.css';

const CardWithLoading = WithLoadingDelay(Card);

export default function CardList({ viewOnly, songs, getSelectedCards }) {
  return (
    <div className="cards">
      {songs.map(songCard => (
        <CardWithLoading
          key={songCard.id}
          {...songCard}
          viewOnly={viewOnly}
          getSelectedCards={isChecked => {
            getSelectedCards(songCard.id, isChecked);
          }}
        />
      ))}
    </div>
  );
}
