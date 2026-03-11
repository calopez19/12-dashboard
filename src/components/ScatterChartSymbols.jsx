import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryLegend, VictoryAxis } from 'victory';
import { useDataStore } from '../stores/filteredStore';

const ScatterChartSymbols = () => {
  // Definición de los 3 conjuntos de datos
  const filteredDeaths = useDataStore((state) => { return state.filteredDeathsData })
  //console.log(filteredDeaths);
  const resultados = Object.groupBy(filteredDeaths, ({ muerte }) => muerte);
  const camilo = filteredDeaths.filter((data) => data.muerte === 'camilo')
  //console.log(camilo);
  const dataCamilo = camilo.map((data) => { return ({x: data['id mision'], y: data.minuto + data.segundo/60}) })
  console.log(resultados.javier);
  
  const data1 = [
    { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 7 }
  ];
  
  const data2 = [
    { x: 1.5, y: 4 }, { x: 2.5, y: 5 }, { x: 3.5, y: 2 }, { x: 4.5, y: 6 }, { x: 5.5, y: 3 }
  ];
  
  const data3 = [
    { x: 1, y: 6 }, { x: 2, y: 1 }, { x: 3, y: 3 }, { x: 4, y: 8 }, { x: 5, y: 5 }
  ];

  return (
    <div style={{ width: "100%", maxWidth: "600px",height:'100%' }}>
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{ x: [0, 6], y: [0, 10] }}
      >
        {/* Leyenda para identificar los símbolos */}
        <VictoryLegend x={125} y={10}
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black" }, title: { fontSize: 14 } }}
          data={[
            { name: "Serie A", symbol: { fill: "#c43a31", type: "circle" } },
            { name: "Serie B", symbol: { fill: "#455a64", type: "star" } },
            { name: "Serie C", symbol: { fill: "#ffcc00", type: "triangleUp" } }
          ]}
        />

        {/* Conjunto de Datos 1: Círculos */}
        <VictoryScatter
          style={{ data: { fill: "#c43a31" } }}
          size={7}
          symbol="circle"
          data={data1}
        />

        {/* Conjunto de Datos 2: Estrellas */}
        <VictoryScatter
          style={{ data: { fill: "#455a64" } }}
          size={7}
          symbol="star"
          data={data2}
        />

        {/* Conjunto de Datos 3: Triángulos */}
        <VictoryScatter
          style={{ data: { fill: "#ffcc00" } }}
          size={7}
          symbol="triangleUp"
          data={data3}
        />

        <VictoryAxis label="Eje $x$" style={{ axisLabel: { padding: 30 } }} />
        <VictoryAxis dependentAxis label="Eje $y$" style={{ axisLabel: { padding: 40 } }} />
      </VictoryChart>
    </div>
  );
};

export default ScatterChartSymbols;