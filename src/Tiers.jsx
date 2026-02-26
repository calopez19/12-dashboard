import React, { useState } from "react";
import { tierFilter } from "./stores/store";

export function DropdownSimple() {
  const tier = tierFilter((state) => state.selectTier)

  const opciones = ["bajo", "Alto", "maestro", "todo"];
  const updateTier = tierFilter((state) => state.setSelectedTier)

  return (
    <select value={tier} onChange={(e) => updateTier(e.target.value)}>
      {opciones.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
