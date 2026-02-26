import { RegionPieChart } from './components/PieChart';
import { useState } from 'react';
import data from './data/csvjson.json'
import newData from './data/newData.json'
import { DropdownSimple } from './components/Tiers';
import { tierFilter, victoryFilter } from './stores/store';
import { filteredData } from './hooks/filterData';
import { useDataStore } from './stores/filteredStore';
const rawData = [
  { region: 'Norte', producto: 'Electrónica', ventas: 400 },
  { region: 'Norte', producto: 'Ropa', ventas: 200 },
  { region: 'Sur', producto: 'Electrónica', ventas: 150 },
  { region: 'Sur', producto: 'Ropa', ventas: 500 },
  { region: 'Este', producto: 'Electrónica', ventas: 300 },
  { region: 'Este', producto: 'Ropa', ventas: 100 },
];
let dataFilter = data.filter(Element => Element.Dia === '22-feb')

const sumaTotal = dataFilter.reduce((acumulador, objetoActual) => {
  return acumulador + objetoActual['Daño Perros'];
}, 0);

function App() {
  const [count, setCount] = useState(0)
  const algo = useDataStore((state) => { return state.filteredDeathsData })
  const victorias = victoryFilter((state) =>state.selectedResult)
  const {numberOfDeaths} = filteredData({data: newData})
  console.log(algo);
  
    
  return (
    <>
      <div>
        <RegionPieChart data={newData} category={'Restante'}/>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {dataFilter.length}
      </p>
      <p>{sumaTotal}</p>
      <DropdownSimple/>
    </>
  )
}

export default App
