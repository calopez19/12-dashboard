import React, { useMemo } from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryLegend,
  VictoryAxis,
} from "victory";
import { useDataStore } from "../stores/filteredStore";

import { SwordShieldIcon } from "./svg/SwordShieldIcon";
import { LanceIcon } from "./svg/LanceIcon";
import { DualBladesIcon } from "./svg/DualBladesIcon";
import { LongSwordIcon } from "./svg/LongSwordIcon";
// 1. Definimos la configuración fuera del componente para evitar recrearla

const CONFIG_PERSONAS = [
  { nombre: "camilo", color: "#1e00ff", simbolo: 'circle' },
  { nombre: "javier", color: "#455a64", simbolo: 'star' },
  { nombre: "luciano", color: "#ffcc00", simbolo: 'square' },
  { nombre: "franco", color: "#c43a31", simbolo: 'triangle' },
];

const ScatterChartSymbols = () => {
  const filteredDeaths = useDataStore((state) => state.filteredDeathsData);

  // 2. Memorizamos el procesamiento de datos
  const resultados = useMemo(() => {
    // Inicializamos el objeto basado en nuestra configuración
    const acc = {};
    CONFIG_PERSONAS.forEach((p) => (acc[p.nombre] = []));

    filteredDeaths.forEach((data) => {
      if (acc.hasOwnProperty(data.muerte)) {
        acc[data.muerte].push({
          x: data["id mision"],
          y: data.minuto + data.segundo / 60,
        });
      }
    });
    return acc;
  }, [filteredDeaths]);

  // 3. Generamos la data de la leyenda dinámicamente
  const legendData = CONFIG_PERSONAS.map((p) => ({
    name: p.nombre,
    symbol: { fill: p.color, type: p.simbolo },
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <VictoryChart
        width={400}
        height={250} // Ajustado un poco para dar aire a la leyenda
        padding={{ top: 50, bottom: 40, left: 50, right: 20 }}
        theme={VictoryTheme.material}
        domain={{ x: [-10, 190], y: [0, 30] }}
      >
        <VictoryLegend
          x={50}
          y={10}
          orientation="horizontal"
          gutter={15}
          style={{ labels: { fontSize: 10 } }}
          data={legendData}
        />

        <VictoryAxis label="Misión" style={{ axisLabel: { padding: 30 } }} />
        <VictoryAxis
          dependentAxis
          label="Minutos"
          style={{ axisLabel: { padding: 35 } }}
        />

        {/* 4. Mapeo dinámico de las series de datos */}
        {CONFIG_PERSONAS.map((persona) => (
          <VictoryScatter
            key={persona.nombre}
            style={{ data: { fill: persona.color } }}
            size={5}
            symbol={persona.simbolo}
            data={resultados[persona.nombre]}
          />
        ))}
      </VictoryChart>
    </div>
  );
};

export default ScatterChartSymbols;
