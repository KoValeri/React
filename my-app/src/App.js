import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import { songCards } from "./data.js";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Card {...songCards[0]} />
      </main>
    </div>
  );
}

export default App;
