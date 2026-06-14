import React, { useState } from 'react';

export const PileChart = ({ 
  v1 = 10, v2 = 20, v3 = 30, v4 = 40, 
  l1 = "Camilo", l2 = "Franco", l3 = "Javier", l4 = "Luciano" 
}) => {
  // 1. Estado para alternar entre mostrar el valor real o el porcentaje
  const [mostrarPorcentaje, setMostrarPorcentaje] = useState(false);

  // 2. Calcular el total y los porcentajes correspondientes
  const total = v1 + v2 + v3 + v4;
  
  // Evitamos la división por cero si el total es 0
  const obtenerPorcentaje = (valor) => {
    if (total === 0) return 0;
    return (valor / total) * 100;
  };

  // 3. Estructura de datos con valores, porcentajes, colores y leyendas.
  const segmentos = [
    { valor: v1, porcentaje: obtenerPorcentaje(v1), color: '#FF5733', leyenda: l1 },
    { valor: v2, porcentaje: obtenerPorcentaje(v2), color: '#33FF57', leyenda: l2 },
    { valor: v3, porcentaje: obtenerPorcentaje(v3), color: '#3357FF', leyenda: l3 },
    { valor: v4, porcentaje: obtenerPorcentaje(v4), color: '#F333FF', leyenda: l4 },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', width: '100%', maxWidth: '600px', margin: '0 auto', position: 'relative',  top: '-50px'  }}>
      
      {/* Botón para cambiar el tipo de visualización */}
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setMostrarPorcentaje(!mostrarPorcentaje)}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'background 0.2s'
          }}
        >
          Ver como: {mostrarPorcentaje ? 'Valores' : 'Porcentajes'}
        </button>
      </div>

      {/* Gráfico de barra segmentada */}
      <div style={{
        width: '100%',
        height: '35px', // Añadido un alto fijo para que se aprecien los números centrados
        display: 'flex', 
        overflow: 'hidden', 
        borderRadius: '6px',
        border: '1px solid #ddd',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
      }}>
        {segmentos.map((seg, index) => {
          // Si el segmento es 0%, no lo renderizamos para evitar textos encimados
          if (seg.porcentaje === 0) return null;

          return (
            <div
              key={index}
              style={{
                width: `${seg.porcentaje}%`, 
                height: '100%',
                backgroundColor: seg.color,
                transition: 'width 0.5s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff', // Texto blanco para que resalte
                fontWeight: 'bold',
                fontSize: '14px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Sombra para mejorar legibilidad
                overflow: 'hidden', // Evita que el texto se salga si el segmento es muy chico
                whiteSpace: 'nowrap'
              }}
            >
              {/* Muestra el valor o el porcentaje redondeado según el estado */}
              {mostrarPorcentaje ? `${seg.porcentaje.toFixed(1)}%` : seg.valor}
            </div>
          );
        })}
      </div>

      {/* Sección de Leyendas debajo del gráfico */}
      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '15px',
        justifyContent: 'center' 
      }}>
        {segmentos.map((seg, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
            <span style={{
              width: '14px',
              height: '14px',
              backgroundColor: seg.color,
              borderRadius: '3px',
              marginRight: '6px',
              display: 'inline-block'
            }} />
            <span>{seg.leyenda} </span>
          </div>
        ))}
      </div>

    </div>
  );
};