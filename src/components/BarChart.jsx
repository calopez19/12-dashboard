import { VictoryPie, VictoryLabel } from "victory";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import {useDashboardStore} from '../stores/store';

export const SalesBarChart = ({ data, category }) => {
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
        animate={{ duration: 50 }}
      />
    </VictoryChart>
  );
};