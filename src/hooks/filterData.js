import muertes from '../data/muertes.json'
import { victoryFilter } from '../stores/store'
import { tierFilter } from '../stores/store'
export const filteredData = ({data}) => {
  const apliedVictoryFilter = victoryFilter((state) => state.selectedResult)
  const apliedTierFilter = tierFilter((state) => state.selectTier)
  console.log(apliedTierFilter,apliedVictoryFilter);
  
  let dataFilter = data.filter(Element => Element.Tiempo === apliedTierFilter)
  dataFilter = apliedVictoryFilter? dataFilter.filter(Element => Element.Restante === apliedVictoryFilter): dataFilter
  
  const numberOfDeaths = muertes.filter((element) => dataFilter.some((data) => data.id === element['id mision']))
  
  return {dataFilter, numberOfDeaths}
}

