import { Card } from "./components/Card";
import { Sword } from "./components/Sword";
import "./styles/dashboard.css";
import { useDataStore } from "./stores/filteredStore";
import { PileChart } from "./components/PileChart";
import { RegionPieChart } from "./components/PieChart";
import newData from "./data/newData.json";
import HorizontalChart from "./components/HorizontalChart";
import ScatterChartSymbols from "./components/ScatterChartSymbols";
import { HatTrick } from "./components/HatTick";
import InteractiveLegendChart from "./components/InteractiveLegendChart";
export function DashBoard() {
  const missionlist = useDataStore((state) => {
    return state.filteredGameData;
  });
  const missionDeaths = useDataStore((state) => {
    return state.filteredDeathsData;
  });
  function formatearTiempo(totalSegundos) {
    const dias = Math.floor(totalSegundos / (3600 * 24));
    const horas = Math.floor((totalSegundos % (3600 * 24)) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = Math.floor(totalSegundos % 60);

    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  const gameTimeMinutes = missionlist.reduce(
    (total, msion) => total + Number(msion.Minutos),
    0,
  );
  const gameTimeSeconds = missionlist.reduce(
    (total, msion) => total + Number(msion.Segundos),
    0,
  );
  //console.log(missionlist);

  const dogDamage = missionlist.reduce((acc, element) => {
    return acc + Number(element["Daño Perros"]);
  }, 0);
  const Damage = missionlist.reduce((acc, element) => {
    return acc + Number(element["Daño C"]);
  }, 0);
  missionlist.forEach((element) => {
    if (typeof element["Daño C"] === 'string') {
      console.log(typeof element["Daño C"], element.id);
    }
  });
  console.log(Damage.toFixed(2));

  return (
    <main className="dashboardContaner">
      <section className="region left-top">
        <Card
          title={"Número de misiones"}
          info={missionlist.length}
          listInfo={[]}
        />
        <Card
          title={"Número de muertes"}
          info={missionDeaths.length}
          listInfo={[]}
        />
        <Card
          title={"Tiempo Total"}
          info={formatearTiempo(gameTimeMinutes * 60 + gameTimeSeconds)}
          listInfo={[]}
        />
        <Card title={"Daño de los perros"} info={dogDamage} listInfo={[]} />
        <Card title={"Daño total"} info={Damage.toFixed(2)} listInfo={[]} />
        <Card title={"muertes"} info={1} listInfo={[]} />
      </section>
      <section className="region left-bottom">
        <Sword />
      </section>
      <section className="region middle">
        <div style={{ width: "100%", height: "150px" }}>
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
          <InteractiveLegendChart />
        </div>
      </section>

      <section className="region right">
        <HorizontalChart />
      </section>
    </main>
  );
}
