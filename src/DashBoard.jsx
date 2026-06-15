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
import DeathHistogram from "./components/TimeHistogram";
import { useMemo } from "react";
import { SwordShieldIcon } from "./components/svg/SwordShieldIcon";
import { LanceIcon } from "./components/svg/LanceIcon";
import { LongSwordIcon } from "./components/svg/LongSwordIcon";
import { DualBladesIcon } from "./components/svg/DualBladesIcon";
import { obtenerRankingCargado } from "./utils";
import { NewCard } from "./components/NwCard";
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

  const DC = useMemo(
    () =>
      missionlist.reduce((acc, element) => {
        return acc + Number(element["Daño C"]);
      }, 0),
    [missionlist],
  );
  const DF = useMemo(
    () =>
      missionlist.reduce((acc, element) => {
        return acc + Number(element["Daño F"]);
      }, 0),
    [missionlist],
  );
  const DJ = useMemo(
    () =>
      missionlist.reduce((acc, element) => {
        return acc + Number(element["Daño J"]);
      }, 0),
    [missionlist],
  );
  const DL = useMemo(
    () =>
      missionlist.reduce((acc, element) => {
        return acc + Number(element["Daño L"]);
      }, 0),
    [missionlist],
  );

  const MDatos = {
    camilo: { icon: <SwordShieldIcon />, name: "Camilo", score: 0 },
    franco: { icon: <SwordShieldIcon />, name: "Franco", score: 0 },
    luciano: { icon: <SwordShieldIcon />, name: "Luciano", score: 0 },
    javier: { icon: <DualBladesIcon />, name: "Javier", score: 0 },
  };

  const listaOrdenada = useMemo(() => {
    return obtenerRankingCargado(MDatos, missionDeaths);
  }, [missionDeaths]);

  return (
    <main className="dashboardContaner">
      <section className="region left-top">
        <Card
          title={"Número de misiones"}
          info={missionlist.length}
          listInfo={[]}
        />
        <NewCard
          title={"Número de muertes"}
          info={missionDeaths.length}
          listInfo={listaOrdenada}
        />
        <Card
          title={"Tiempo Total"}
          info={formatearTiempo(gameTimeMinutes * 60 + gameTimeSeconds)}
          listInfo={[]}
        />
        <Card title={"Daño de los perros"} info={dogDamage} listInfo={[]} />
        <Card
          title={"Daño total"}
          info={(DC + DL + DF + DJ).toFixed(2)}
          listInfo={[]}
        />
        <Card title={"Muerte más rapida"} info={'Javier a los 42 s'} listInfo={[]} />
      </section>
      <section className="region left-bottom">
        <Sword daño1={DC} daño2={DF} daño3={DJ} daño4={DL} />
      </section>
      <section className="region middle">
        <div style={{ width: "100%", height: "150px", display: "flex" }}>
          <HatTrick />
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
        <DeathHistogram data={missionDeaths} />
      </section>
    </main>
  );
}
