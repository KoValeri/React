import "./Card.css";
import { useState } from "react";

export default function Card() {
  const [checkboxState, setCheckboxState] = useState(false);

  function checkChange(event) {
    setCheckboxState(event.target.checked);
  }

  return (
    <div
      className="card"
      style={{ backgroundColor: checkboxState ? "#a63d40" : "white" }}
    >
      <h2 className="song-name">Until Eternity</h2>
      <p className="song-text">
        {`I loved you once, I loved you twice
      I loved you in my previous lives
      I know your voice, I know your eyes
      You haunt me through my dreams at night
      Oh my love we'll meet again
      We always do in the end
      Our two souls destined to be
      You and I until eternity`}
      </p>
      <div className="ch-box">
        <input type="checkbox" onChange={checkChange}></input>
        <label>Click me!</label>
      </div>
    </div>
  );
}
