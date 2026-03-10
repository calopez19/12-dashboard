import { Card } from "./components/Card";
import { Sword } from "./components/Sword";
import "./styles/dashboard.css";

export function DashBoard() {
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
        <Sword/>
      </section>
      <section className="region middle"></section>
      <section className="region right"></section>
    </main>
  );
}
