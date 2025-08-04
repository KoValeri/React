import '../App.css';
import WorkWithCards from '../components/WorkWithCards/WorkWithCards.jsx';
import CardList from '../components/CardList/CardList.jsx';

export default function Home() {
  return (
    <>
      <WorkWithCards />
      <main>
        <div className="cards-block">
          <CardList />
        </div>
      </main>
    </>
  );
}
