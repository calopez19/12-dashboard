import { create } from 'zustand';

const useDashboardStore = create((set) => ({
  selectedCategory: null, // Filtro global
  setSelectedCategory: (category) => set((state) => ({
    // Si se hace click en la misma categoría, se limpia el filtro (toggle)
    selectedCategory: state.selectedCategory === category ? null : category
  })),
}));

export default useDashboardStore;