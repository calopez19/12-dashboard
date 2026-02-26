import { create } from 'zustand';
import deaths from '../data/muertes.json'
import gameData from '../data/newData.json'
// Supongamos que esta es tu data inicial

export const useDataStore = create((set, get) => ({
  // 1. ESTADOS BASE
  rawGameData: gameData,
  rawDeathData: deaths,
  selectTier: null,
  selectedResult: null,
  
  // 2. ESTADO DERIVADO (Aquí vive la lista ya filtrada)
  filteredGameData: gameData, 
  filteredDeathsData: deaths,
  // 3. ACCIONES
  setTier: (tier) => {
    set({ selectTier: (tier === 'todo')? null : tier });
    get().applyFilters(); // Ejecutamos el filtro tras cambiar el estado
  },

  setResult: (result) => {
    set((state) => ({
      selectedResult: state.selectedResult === result ? null : result
    }));
    get().applyFilters();
  },

  // 4. LA LÓGICA DE FILTRADO (Se ejecuta una sola vez)
  applyFilters: () => {
    const { rawGameData, rawDeathData, selectTier, selectedResult } = get();
    
    let newGameData = selectTier? rawGameData.filter(Element => Element.Tiempo === selectTier) : rawGameData
    newGameData = selectedResult? newGameData.filter(Element => Element.Restante === selectedResult): newGameData

    const newDeathData = rawDeathData.filter((element) => newGameData.some((data) => data.id === element['id mision']))

    set({ filteredData: newGameData,  filteredDeathsData: newDeathData});
  }
}));