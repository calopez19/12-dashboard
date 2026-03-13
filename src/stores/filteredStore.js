import { create } from 'zustand';
import deaths from '../data/muertesfinal.json'
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
    set({ selectTier: (tier === 'todo') ? null : tier });
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

    let newGameData = selectTier ? rawGameData.filter(Element => Element.Tiempo === selectTier) : rawGameData
    console.log(newGameData);
    
    newGameData = selectedResult ? newGameData.filter(Element => Element.Restante === selectedResult) : newGameData
    console.log(newGameData);
    const validIds = new Set(newGameData.map(data => data.id));
    const newDeathData = rawDeathData.filter(death =>
      validIds.has(death['id mision']))

    set({ filteredGameData: newGameData, filteredDeathsData: newDeathData });
  }
}));