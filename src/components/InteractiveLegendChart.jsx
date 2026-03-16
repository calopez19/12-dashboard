import React, { useState, useMemo } from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryLegend,
  VictoryContainer,
} from "victory";
import { useDataStore } from "../stores/filteredStore";

const InteractiveLegendChart = () => {
  // Estado para saber qué serie está seleccionada
  const [activeSerie, setActiveSerie] = useState(null);

  const series = [
    { name: "camilo", color: "#1e00ff", symbol: "circle" },
    { name: "javier", color: "#455a64", symbol: "star" },
    { name: "luciano", color: "#ffcc00", symbol: "square" },
    { name: "franco", color: "#c43a31", symbol: "triangle" },
  ];

  const filteredDeaths = useDataStore((state) => state.filteredDeathsData);

  // 2. Memorizamos el procesamiento de datos
  const resultados = useMemo(() => {
    // Inicializamos el objeto basado en nuestra configuración
    const acc = {};
    series.forEach((p) => (acc[p.name] = []));

    filteredDeaths.forEach((data) => {
      if (acc.hasOwnProperty(data.muerte)) {
        acc[data.muerte].push({
          x: data["id"],
          y: data.minuto + data.segundo / 60,
        });
      }
    });
    return acc;
  }, [filteredDeaths]);

  return (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <VictoryChart
        width={800}
        height={400}
        theme={VictoryTheme.material}
        domain={{ x: [-10, 190], y: [0, 30] }}
        // Agregamos un contenedor para resetear al hacer click en el fondo
        containerComponent={
          <VictoryContainer onClick={() => setActiveSerie(null)} />
        }
      >
        <VictoryLegend
          x={125}
          y={10}
          orientation="horizontal"
          gutter={20}
          data={series.map((s) => ({
            name: s.name,
            symbol: {
              fill: s.color,
              type: s.symbol,
              // Estilo visual en la leyenda según selección
              fillOpacity:
                activeSerie === null || activeSerie === s.name ? 1 : 0.2,
            },
            labels: {
              fill:
                activeSerie === null || activeSerie === s.name
                  ? "black"
                  : "#ccc",
            },
          }))}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        // Al hacer click, actualizamos el estado con el nombre de la serie
                        const selectedName = props.datum.name;
                        setActiveSerie((prev) =>
                          prev === selectedName ? null : selectedName,
                        );
                      },
                    },
                  ];
                },
              },
            },
          ]}
          style={{ data: { cursor: "pointer" } }}
        />

        {series.map((s) => (
          <VictoryScatter
            key={s.name}
            data={resultados[s.name]}
            symbol={s.symbol}
            size={7}
            style={{
              data: {
                fill: s.color,
                // Si hay una serie activa y no es esta, se vuelve transparente
                opacity:
                  activeSerie === null || activeSerie === s.name ? 1 : 0.1,
                transition: "opacity 300ms ease",
              },
            }}
          />
        ))}
      </VictoryChart>
    </div>
  );
};

export default InteractiveLegendChart;
