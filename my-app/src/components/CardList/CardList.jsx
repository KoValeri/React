import Card from '../Card/Card.jsx';
import WithLoadingDelay from '../Loading/WithLoadingDelay.jsx';
import '../../App.css';
import { SongContext } from '../../app_context/song-context.jsx';
import { useContext } from 'react';
import PropTypes from 'prop-types';

const CardWithLoading = WithLoadingDelay(Card);

export default function CardList({ viewOnly }) {
  const { songs, getSelectedCards } = useContext(SongContext);

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

CardList.propTypes = {
  viewOnly: PropTypes.bool,
};
