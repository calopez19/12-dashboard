import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
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
    return Object.entries(counts).map(([name, count]) => ({
      x: name,
      y: count,
    }));
  }, [filteredGameData]);
  console.log(results);

  return (
    <>
      <div style={{ height: "400px", width: "100%" }}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          // Ajustamos el padding izquierdo para que los nombres largos no se corten
          padding={{ top: 20, bottom: 50, left: 100, right: 20 }}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}`}
            label="Cantidad de Muertes"
            style={{ axisLabel: { padding: 35 } }}
          />
          <VictoryAxis
            // Este eje mostrará los nombres de los monstruos
            style={{ tickLabels: { fontSize: 10 } }}
          />
          <VictoryBar
            horizontal
            data={results}
            style={{
              data: { fill: "#c43a31", width: 15 },
            }}
            // Animación suave al cargar/cambiar datos
            animate={{
              duration: 500,
              onLoad: { duration: 200 },
            }}
            labels={({ datum }) => datum.y}
            labelComponent={<VictoryLabel dx={10} />}
          />
        </VictoryChart>
      </div>
    </>
  );
};

export default HorizontalChart;
