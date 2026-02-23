import { VictoryPie, VictoryLabel } from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import useDashboardStore from './store';
import { useState } from 'react';
const rawData = [
  { region: 'Norte', producto: 'Electrónica', ventas: 400 },
  { region: 'Norte', producto: 'Ropa', ventas: 200 },
  { region: 'Sur', producto: 'Electrónica', ventas: 150 },
  { region: 'Sur', producto: 'Ropa', ventas: 500 },
  { region: 'Este', producto: 'Electrónica', ventas: 300 },
  { region: 'Este', producto: 'Ropa', ventas: 100 },
];

const RegionPieChart = ({ data }) => {
  const setSelectedCategory = useDashboardStore((state) => state.setSelectedCategory);
  const selectedCategory = useDashboardStore((state) => state.selectedCategory);

  // Agrupar datos por región para el Pie
  const pieData = data.reduce((acc, curr) => {
    const existing = acc.find(item => item.x === curr.region);
    if (existing) existing.y += curr.ventas;
    else acc.push({ x: curr.region, y: curr.ventas });
    return acc;
  }, []);

  return (
    <VictoryPie
      data={pieData}
      colorScale={["#0088FE", "#00C49F", "#FFBB28"]}
      innerRadius={70}
      style={{
        data: {
          cursor: "pointer",
          // Resaltar la sección seleccionada
          fillOpacity: ({ datum }) => (selectedCategory === null || selectedCategory === datum.x ? 1 : 0.3),
          stroke: ({ datum }) => (selectedCategory === datum.x ? "#000" : "none"),
          strokeWidth: 2
        }
      }}
      events={[{
        target: "data",
        eventHandlers: {
          onClick: () => {
            return [{
              target: "data",
              mutation: (props) => {
                setSelectedCategory(props.datum.x); // Actualiza Zustand
                return null;
              }
            }];
          }
        }
      }]}
    />
  );
};


const SalesBarChart = ({ data }) => {
  const selectedCategory = useDashboardStore((state) => state.selectedCategory);

  // Filtrar datos según el estado global de Zustand
  const filteredData = selectedCategory 
    ? data.filter(item => item.region === selectedCategory)
    : data;

  // Formatear para VictoryBar (X: Producto, Y: Ventas)
  const barData = filteredData.map(item => ({ x: item.producto, y: item.ventas }));

  return (
    <VictoryChart domainPadding={20}>
      <VictoryAxis />
      <VictoryAxis dependentAxis />
      <VictoryBar
        data={barData}
        style={{
          data: { 
            fill: selectedCategory ? "#00C49F" : "#0088FE",
            width: 30 
          }
        }}
        animate={{ duration: 500 }}
      />
    </VictoryChart>
  );
};

const Dashboard = () => {
  const selectedCategory = useDashboardStore((state) => state.selectedCategory);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Ventas Dashboard</h1>
      <p>Filtro activo: <strong>{selectedCategory || 'Todos'}</strong></p>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ width: '400px' }}>
          <h3>Ventas por Región (Click para filtrar)</h3>
          <RegionPieChart data={rawData} />
        </div>

        <div style={{ width: '500px' }}>
          <h3>Detalle por Producto</h3>
          <SalesBarChart data={rawData} />
        </div>
      </div>
    </div>
  );
};


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Dashboard/>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
