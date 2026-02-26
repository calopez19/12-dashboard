import { VictoryPie, VictoryLabel } from "victory";
import { victoryFilter } from "../stores/store";
import { useDataStore } from "../stores/filteredStore";

export const RegionPieChart = ({ data, category }) => {
  // use the victory filter store to track the selected result slice
  const results = useDataStore((state) => { return state.filteredGameData })
  const deathResults = useDataStore((state) => { return state.filteredDeathsData })
  const setResult = useDataStore((state) => { return state.setResult })
  const setSelectedResult = victoryFilter((state) => state.setSelectedResult);
  const selectedResult = victoryFilter((state) => state.selectedResult);

  // contar los datos de la columna dada
  const pieData = data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.x === curr[category]);
    if (existing) existing.y += 1;
    else acc.push({ x: curr[category], y: 1 });
    return acc;
  }, []);

  return (
    <VictoryPie
      data={pieData}
      colorScale={["#0ecf0e", "#e4280f"]}
      style={{
        data: {
          cursor: "pointer",
          // Resaltar la sección seleccionada
          fillOpacity: ({ datum }) =>
            selectedResult === null || selectedResult === datum.x ? 1 : 0.3,
          stroke: ({ datum }) =>
            selectedResult === datum.x ? "#000" : "none",
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
                    setSelectedResult(props.datum.x);
                    setResult(props.datum.x);
                     // Actualiza Zustand
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
