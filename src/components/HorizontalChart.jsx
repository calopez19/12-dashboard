import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const data = [
  { trimestre: "Q1", ganancias: 13000 },
  { trimestre: "Q2", ganancias: 16500 },
  { trimestre: "Q3", ganancias: 14200 },
  { trimestre: "Q4", ganancias: 19000 }
];

const HorizontalChart = () => {
  return (
    <div style={{ width: "50%", maxWidth: "300px", height: '400px' }}>
      <VictoryChart
        domainPadding={{x: [30,30]}}
        theme={VictoryTheme.material}
        // El padding es importante para que las etiquetas no se corten
        padding={{ top: 50, bottom: 50, left: 80, right: 50 }}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={data.map(d => d.trimestre)}
        />
        <VictoryAxis 
          dependentAxis 
          tickFormat={(x) => `$${x / 1000}k`}
        />
        <VictoryBar
          horizontal
          data={data}
          x={(d) => data.indexOf(d) + 1}
          y="ganancias"
          style={{
            data: { fill: "#c43a31", width: 25 }
          }}
          // Animación opcional para que se vea profesional
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default HorizontalChart;