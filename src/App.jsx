import { RegionPieChart } from "./components/PieChart";
import newData from "./data/newData.json";
import { DropdownSimple } from "./components/Tiers";
import { useDataStore } from "./stores/filteredStore";

function App() {
  const deathlist = useDataStore((state) => {
    return state.filteredDeathsData;
  });
  const missionlist = useDataStore((state) => {
    return state.filteredGameData;
  });

  return (
    <>
      <div>
        <RegionPieChart data={newData} category={"Restante"} />
      </div>
      <div className="card">
        <p>{`muertes totales: ${deathlist.length}`}</p>
        <p>{`misiones totales: ${missionlist.length}`}</p>
      </div>

      <DropdownSimple />
    </>
  );
}

export default App;
