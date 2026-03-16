import { useDataStore } from "../stores/filteredStore";
import { useMemo } from "react";
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
      if (acc.sum === 2) {
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
  return <></>;
}
