export const obtenerRankingCargado = (datosBase, listaMuertes) => {
  // 1. Clonamos el objeto de manera limpia usando el spread operator
  const datosActualizados = {};
  
  for (const [key, value] of Object.entries(datosBase)) {
    datosActualizados[key] = { 
      ...value, 
      score: 0 // Reseteamos a 0 para recalcular de forma limpia cada vez
    };
  }

  // 2. Contamos las muertes y sumamos al score
  listaMuertes.forEach(registro => {
    // Validamos que el registro tenga la propiedad 'muerte'
    if (registro && registro.muerte) {
      const jugador = registro.muerte.toLowerCase();
      if (datosActualizados[jugador]) {
        datosActualizados[jugador].score += 1;
      }
    }
  });

  // 3. Convertimos a Array y ordenamos de Mayor a Menor score
  return Object.values(datosActualizados).sort((a, b) => b.score - a.score);
};