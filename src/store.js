import { create } from 'zustand';

export const useDashboardStore = create((set) => ({
  selectedCategory: null, // Filtro global
  setSelectedCategory: (category) => set((state) => ({
    // Si se hace click en la misma categoría, se limpia el filtro (toggle)
    selectedCategory: state.selectedCategory === category ? null : category
  })),
}));

export const tierFilter = create((set) => ({ 
  selectTier: 'todo',
  setSelectedTier: (category) => set(() => ({
    selectTier: category
  }))
 }))

 export const victoryFilter = create((set) => ({
  selectedResult: null,
  setSelectedResult: (category) => set((state) => ({
    selectedResult: state.selectedCategory === category ? null : category
  }))
 })
)

