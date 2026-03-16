
export const PileChart = () => {
  // Tus 4 variables de porcentaje (deben sumar 100)
  const porcen1 = 20.2343443532;
  const porcen2 = 40;
  const porcen3 = 15;
  const porcen4 = 25;

  // Configuración de colores para cada parte
  const segmentos = [
    { valor: porcen1, color: '#FF5733' }, // Naranja
    { valor: porcen2, color: '#33FF57' }, // Verde
    { valor: porcen3, color: '#3357FF' }, // Azul
    { valor: porcen4, color: '#F333FF' }, // Morado
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex', // Alinea los hijos en fila
      overflow: 'hidden', // Asegura que las esquinas respeten el borde
      border: '1px solid #ddd'
    }}>
      {segmentos.map((seg, index) => (
        <div
          key={index}
          style={{
            width: `${seg.valor}%`, // Aquí aplicas la variable
            height: '100%',
            backgroundColor: seg.color,
            transition: 'width 0.5s ease' // Suaviza el cambio si los valores varían
          }}
        />
      ))}
    </div>
  );
};

