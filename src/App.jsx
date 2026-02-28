import { RegionPieChart } from "./components/PieChart";
import newData from "./data/newData.json";
import { DropdownSimple } from "./components/Tiers";
import { useDataStore } from "./stores/filteredStore";
import { PileChart } from "./components/PileChart";
import SVGComponent from "./components/Pata";
import HorizontalChart from "./components/HorizontalChart";
import { Card } from "./components/Card";

function App() {
  const deathlist = useDataStore((state) => {
    return state.filteredDeathsData;
  });
  const missionlist = useDataStore((state) => {
    return state.filteredGameData;
  });
  const damage =
    missionlist[0]["Daño C"] +
    missionlist[0]["Daño J"] +
    missionlist[0]["Daño F"] +
    missionlist[0]["Daño L"];
  const damageC = (missionlist[0]["Daño C"] / damage) * 100;
  const damageF = (missionlist[0]["Daño F"] / damage) * 100;
  const damageJ = (missionlist[0]["Daño J"] / damage) * 100;
  const damageL = (missionlist[0]["Daño L"] / damage) * 100;
  return (
    <>
      <div style={{ height: "150px", width: "150px" }}>
        <RegionPieChart data={newData} category={"Restante"} />
      </div>
      <div className="card">
        <p>{`muertes totales: ${deathlist.length}`}</p>
        <p>{`misiones totales: ${missionlist.length}`}</p>
        <p>
          {damage} {damageC * 100}
        </p>
      </div>
      <SVGComponent />
      <div
        style={{
          width: "160px",
          height: "40px",
          display: "flex", // Alinea los hijos en fila
          overflow: "hidden", // Asegura que las esquinas respeten el borde
          borderRadius: "8px", // Opcional: para que se vea más moderno
          border: "1px solid #ddd",
        }}
      >
        <div
          style={{
            width: `${damageC}%`,
            backgroundColor: "red",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            width: `${damageF}%`,
            backgroundColor: "blue",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            width: `${damageJ}%`,
            backgroundColor: "orange",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            width: `${damageL}%`,
            backgroundColor: "gray",
            height: "100%",
          }}
        ></div>
      </div>
      <PileChart />
      <DropdownSimple />
      <HorizontalChart />
      <Card
        title={"muertes"}
        info={deathlist.length}
        listInfo={[
          {
            name: "pepe",
            icon: <SVGComponent />,
            score: 55,
          },
        ]}
      />
    </>
  );
}

export default App;
