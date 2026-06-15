import "../styles/card.css";
import tarjeta from '../assets/CardMonster.png';

export const NewCard = ({ title, info, listInfo = [] }) => {
  return (
    <div className="card" style={{ backgroundImage: `url(${tarjeta})` }}>
      <h2>{title}</h2>
      <p>{info}</p>
      
      {/* Usamos && en lugar de un ternario que termina en null */}
      {listInfo.length > 0 && (
        <aside className="rank">
          {listInfo.map((person, index) => (
            // Usamos una key segura combinando nombre e índice si no hay ID
            <div key={person.id || `${person.name}-${index}`} className="person-row">
              
              {/* 1. SVG a la izquierda */}
              <div className="person-icon">
                {person.icon}
              </div>

              {/* 2. Nombre en el centro */}
              <span className="person-name">{person.name}</span>

              {/* 3. Puntaje a la derecha */}
              <span className="person-score">{person.score}</span>
            </div>
          ))}
        </aside>
      )}
    </div>
  );
};