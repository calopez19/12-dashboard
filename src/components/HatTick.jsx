import { useDataStore } from "../stores/filteredStore";
import { useMemo } from "react";
import { SwordShieldIcon } from "./svg/SwordShieldIcon";
import { LanceIcon } from "./svg/LanceIcon";
import { LongSwordIcon } from "./svg/LongSwordIcon";
import { DualBladesIcon } from "./svg/DualBladesIcon";


const svg = {camilo:  <SwordShieldIcon/>, franco: <LanceIcon/>, luciano: <LongSwordIcon/>, javier: <DualBladesIcon/> }
export function HatTrick() {
  const filteredDeathData = useDataStore((state) => {
    return state.filteredDeathsData;
  });
  const filteredGamehData = useDataStore((state) => {
    return state.filteredGameData;
  });
  const hatTricks = useMemo(() => {
    const trick = { camilo: [], javier: [], luciano: [], franco: [] };
    let acc = { person: null, mision: null, sum: 0, tiempos: [] };
    filteredDeathData.forEach((element) => {
      if (
        acc.person !== element.muerte ||
        acc.mision !== element["id"]
      ) {
        acc.person = element.muerte;
        acc.mision = element["id"];
        acc.sum = 1;
        acc["tiempos"] = [
          `${String(element.minuto)}:${String(element.segundo)}`,
        ];
      } else {
        acc["tiempos"] = [
          ...acc["tiempos"],
          `${String(element.minuto)}:${String(element.segundo)}`,
        ];
        acc.sum += 1;
      }
      if (acc.sum === 3) {
        const monstruo = filteredGamehData.find(
          (element) => element.id === acc.mision,
        ).monstruo;
        trick[acc.person] = [
          ...trick[acc.person],
          { mision: acc.mision, monstruo: monstruo, tiempos: acc.tiempos },
        ];
      }
    });

    return trick;
  }, [filteredDeathData]);
  console.log(hatTricks);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      {Object.entries(hatTricks).map(([usuario, misiones]) => (
        <div key={usuario} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {misiones.map((mision, index) => (
              <svg key={index} width="75" height="75" viewBox="0 0 100 100">
                {/* Círculo de fondo */}
                <circle cx="50" cy="50" r="45" stroke="#333" strokeWidth="2" fill="transparent" />
                
                {/* Contenedor para el Icono: Escalamos y centramos el componente */}
                <g transform="translate(20, 20) scale(0.9)"> 
                  {svg[usuario]}
                </g>

                {/* Texto del número de misión en el centro/abajo */}
                <text 
                  x="50" 
                  y="25" 
                  textAnchor="middle" 
                  fontSize="16" 
                  fontWeight="bold" 
                  fill="black"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {mision.mision}
                </text>
              </svg>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
