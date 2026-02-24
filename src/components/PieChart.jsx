import { VictoryPie, VictoryLabel } from "victory";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import {useDashboardStore} from './store';

export const RegionPieChart = ({ data }) => {
  const setSelectedCategory = useDashboardStore(
    (state) => state.setSelectedCategory,
  );
  const selectedCategory = useDashboardStore((state) => state.selectedCategory);

  // Agrupar datos por región para el Pie
  const pieData = data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.x === curr.region);
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
          fillOpacity: ({ datum }) =>
            selectedCategory === null || selectedCategory === datum.x ? 1 : 0.3,
          stroke: ({ datum }) =>
            selectedCategory === datum.x ? "#000" : "none",
          strokeWidth: 2,
        },
      }}
      events={[
        {
          target: "data",
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    setSelectedCategory(props.datum.x); // Actualiza Zustand
                    return null;
                  },
                },
              ];
            },
          },
        },
      ]}
    />
  );
};
