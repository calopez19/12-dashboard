import { useDataStore } from "../stores/filteredStore";

export function DropdownSimple() {
  const tier = useDataStore((state) => state.selectTier)
  const setTier = useDataStore((state) => { return state.setTier })
  const opciones = ["bajo", "Alto", "maestro", "todo"];
  return (
    <select value={(tier === null)? 'todo': tier} onChange={(e) => setTier(e.target.value)}>
      {opciones.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
