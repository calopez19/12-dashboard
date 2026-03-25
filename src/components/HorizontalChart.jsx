import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryContainer
} from "victory";
import { useDataStore } from "../stores/filteredStore";
import { useMemo } from "react";

const data = [
  { trimestre: "Q1", ganancias: 13000 },
  { trimestre: "Q2", ganancias: 16500 },
  { trimestre: "Q3", ganancias: 14200 },
  { trimestre: "Q4", ganancias: 19000 },
];

const HorizontalChart = () => {
  const filteredGameData = useDataStore((state) => {
    return state.filteredGameData;
  });
  const filtereddeathData = useDataStore((state) => {
    return state.filteredDeathsData;
  });
  const gameMap = useMemo(
    () => new Map(filteredGameData.map((g) => [g.id, g.monstruo])),
    [filteredGameData],
  );

  const results = useMemo(() => {
    // 3. Usamos un objeto simple para contar de forma estable
    const counts = {};

    filtereddeathData.forEach((kill) => {
      const monsterName = gameMap.get(kill.id);
      if (monsterName) {
        counts[monsterName] = (counts[monsterName] || 0) + 1;
      }
    });

    // 4. Convertimos el objeto de conteo a un array de resultados
    // Estructura ideal para Victory: { x: "Nombre", y: Cantidad }
    return (
      Object.entries(counts)
        .map(([name, count]) => ({ x: name, y: count }))
        // Ordenamos de mayor a menor
        .sort((a, b) => a.y - b.y)
    );
  }, [filteredGameData]);
  console.log(results);
  const dynamicHeight = Math.max(results.length * 45, 300);

  return (
    <div style={{ 
      height: '400px', // Altura fija del contenedor visible
      overflowY: 'auto', // Scroll vertical
      border: '1px solid #ccc',
      borderRadius: '8px'
    }}>
      <div style={{ height: `${dynamicHeight}px` }}>
        <VictoryChart
          horizontal
          theme={VictoryTheme.material}
          height={dynamicHeight} // Aplicamos la altura calculada aquí
          width={250}
          padding={{ top: 50, bottom: 50, left: 120, right: 40 }}
          // Importante: usar el contenedor nativo para evitar conflictos de scroll
          containerComponent={<VictoryContainer responsive={false} />}
        >
          <VictoryAxis
            dependentAxis
            label="Kills"
            style={{ axisLabel: { padding: 30 } }}
          />
          <VictoryAxis 
            style={{ 
              tickLabels: { fontSize: 12, padding: 5 } 
            }} 
          />
          <VictoryBar
            data={results}
            style={{
              data: { 
                fill: ({ datum }) => datum.y > 10 ? "#c43a31" : "#ffbb33",
                width: 25 
              }
            }}
            labels={({ datum }) => datum.y}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default HorizontalChart;
