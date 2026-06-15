import { Background } from "victory";
import sword from "../assets/espada.png";
import { PileChart } from "./PileChart";
export function Sword({ daño1 = 1, daño2 = 2, daño3 = 3, daño4 = 4 }) {
  return (
    <div
      className="swordContainer"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img src={sword} style={{ width: "400px", height: "75px" }} />
      <div
        style={{
          backgroundColor: "red",
          position: "absolute",
          top: "90px",
          left: "85px",
          width: "269px",
          height: "32px",
        }}
      >
        <PileChart v1={daño1} v2={daño2} v3={daño3} v4={daño4}/>
      </div>
    </div>
  );
}
