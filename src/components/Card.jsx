import "../styles/card.css";
import SVGComponent from "./Pata";
export const Card = ({ title, info, listInfo = [] }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <h1>{info}</h1>
      {listInfo.length ? (
        <aside className="rank">
          {listInfo.map((person, index) => (
            <div key={person.id || index} className="person-row">
              {/* 1. SVG a la izquierda */}
              {person.icon}

              {/* 2. Nombre en el centro */}
              <span className="person-name">{person.name}</span>

              {/* 3. Puntaje a la derecha */}
              <span className="person-score">{person.score}</span>
            </div>
          ))}
        </aside>
      ) : null}
    </div>
  );
};
