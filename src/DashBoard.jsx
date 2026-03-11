import { Card } from "./components/Card";
import { Sword } from "./components/Sword";
import "./styles/dashboard.css";
import { useDataStore } from "./stores/filteredStore";
import { PileChart } from "./components/PileChart";
import { RegionPieChart } from "./components/PieChart";
import newData from "./data/newData.json";
import HorizontalChart from "./components/HorizontalChart";
import { Scale } from "victory";
import ScatterChartSymbols from "./components/ScatterChartSymbols";
import { HatTrick } from "./components/HatTick";

export function DashBoard() {
  const missionlist = useDataStore((state) => {
    return state.filteredGameData;
  });

  return (
    <main className="dashboardContaner">
      <section className="region left-top">
        <Card title={"muertes"} info={1} listInfo={[]} />
        <Card title={"muertes"} info={1} listInfo={[]} />
        <Card title={"muertes"} info={1} listInfo={[]} />
        <Card title={"muertes"} info={1} listInfo={[]} />
        <Card title={"muertes"} info={1} listInfo={[]} />
        <Card title={"muertes"} info={1} listInfo={[]} />
      </section>
      <section className="region left-bottom">
        <Sword />
      </section>
      <section className="region middle">
        <div
          style={{ width: "100%", height: "150px", }}
        >
          <ScatterChartSymbols />
        </div>
        <div
          style={{
            width: "100%",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RegionPieChart data={newData} category={"Restante"} />
          
        </div>
        <div
          style={{
            width: "100%",
            height: "220px",
            
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScatterChartSymbols />
        </div>
      </section>
      <section className="region right"></section>
      <HatTrick/>
    </main>
  );
}
