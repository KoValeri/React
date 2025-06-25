import "./App.css";
import { useState } from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import { songCards } from "./data.js";

function App() {
  const [viewOnly, setViewOnly] = useState(false);

  function checkView(event) {
    setViewOnly(event.target.checked);
  }

  return (
    <div>
      <Header />
      <div className="view-only">
        <input type="checkbox" onChange={checkView} />
        <label>View only</label>
      </div>
      <main>
        <div className="cards">
          {songCards.map((songCard) => (
            <Card key={songCard.title} {...songCard} viewOnly={viewOnly} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
