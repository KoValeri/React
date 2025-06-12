import "./Card.css";

const lyrics = `I loved you once, I loved you twice
      I loved you in my previous lives
      I know your voice, I know your eyes
      You haunt me through my dreams at night
      Oh my love we'll meet again
      We always do in the end
      Our two souls destined to be
      You and I until eternity`;

export default function Card() {
  return (
    <div className="card">
      <h2 className="song-name">Until Eternity</h2>
      <p className="song-text">
        {lyrics.split("\n").map((line) => (
          <span>
            {line} <br />
          </span>
        ))}
      </p>
    </div>
  );
}
