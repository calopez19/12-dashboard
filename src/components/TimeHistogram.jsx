import React, { useState, useMemo } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

const DeathHistogram = ({ data = [] }) => {
  // 1. Obtener la lista única de jugadores para el dropdown
  const players = useMemo(() => {
    const uniquePlayers = new Set(data.map(item => item.muerte.toLowerCase()));
    return Array.from(uniquePlayers).map(p => p.charAt(0).toUpperCase() + p.slice(1));
  }, [data]);

  // 2. Estado para el jugador seleccionado
  const [selectedPlayer, setSelectedPlayer] = useState('Todos');

  // 3. Filtrar y procesar los datos según la selección
  const chartData = useMemo(() => {
    // Filtrar por jugador si no está en 'Todos'
    const filteredData = selectedPlayer === 'Todos'
      ? data
      : data.filter(item => item.muerte.toLowerCase() === selectedPlayer.toLowerCase());

    // Agrupar muertes por minuto
    const minutesMap = {};
    filteredData.forEach(item => {
      const min = item.minuto;
      minutesMap[min] = (minutesMap[min] || 0) + 1;
    });

    // Si no hay datos, devolvemos un array vacío
    if (filteredData.length === 0) return [];

    // Encontrar el minuto máximo para asegurar que el gráfico muestre todo el rango
    const maxMinute = Math.max(...data.map(item => item.minuto), 5); // mínimo hasta el minuto 5 por estética
    
    // Formatear los datos para Victory (rellenando con 0 los minutos sin muertes)
    const formattedData = [];
    for (let i = 0; i <= maxMinute; i++) {
      formattedData.push({
        minute: i,
        deaths: minutesMap[i] || 0,
        label: `Min ${i}: ${minutesMap[i] || 0} muertes` // Tooltip interactivo
      });
    }

    return formattedData;
  }, [data, selectedPlayer]);

  return (
    <div style={{ backgroundColor: 'transparent',maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', position: 'relative' ,top: '0px' }}>
      
      {/* Controles / Dropdown */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label htmlFor="player-select" style={{ fontWeight: 'bold' }}>
          Filtrar por jugador:
        </label>
        <select
          id="player-select"
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Todos">Todos los jugadores</option>
          {players.map(player => (
            <option key={player} value={player}>
              {player}
            </option>
          ))}
        </select>
      </div>

      {/* Gráfico de Victory */}
      <div style={{ backgroundColor: 'transparent', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '300px'}}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 15 }}
          animate={{ duration: 300 }}
        >
          {/* Eje X - Minutos */}
          <VictoryAxis
            label="Minuto de la partida"
            tickFormat={(t) => `${t}'`}
            style={{
              axisLabel: { padding: 30 },
              grid: { stroke: 'none' }
            }}
          />

          {/* Eje Y - Cantidad de Muertes */}
          <VictoryAxis
            dependentAxis
            label="Cantidad de Muertes"
            tickFormat={(t) => (Number.isInteger(t) ? t : '')} // Evita decimales en el eje Y
            style={{
              axisLabel: { padding: 40 }
            }}
          />

          {/* Barras del Histograma */}
          <VictoryBar
            data={chartData}
            x="minute"
            y="deaths"
            labelComponent={<VictoryTooltip pointerLength={0} flyoutStyle={{ fill: "black" }} style={{ fill: "white" }} />}
            style={{
              data: { 
                fill: selectedPlayer === 'Todos' ? '#4f46e5' : '#06b6d4',
                width: 18
              }
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default DeathHistogram;