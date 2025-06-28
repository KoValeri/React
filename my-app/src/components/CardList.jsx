import Card from './Card.jsx';
import '../App.css';

export default function CardList({ viewOnly, songs, getSelectedCards }) {
  return (
    <div className="cards">
      {songs.map(songCard => (
        <Card
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
