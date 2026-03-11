export const LanceIcon = (props) => {
  const { x, y, style } = props;
  return (
    <g 
      transform={`translate(${x - 32}, ${y - 32}) scale(0.3)`} 
      style={{ opacity: style?.opacity || 1, transition: "opacity 300ms ease" }}
    >
      <g transform="translate(-256 -960)">
        <g id="Lance">
          <path 
            id="background" 
            d="M300 974v38h-3l-4-4v-32l4-2zm-24 34h-4v2h4zm5.066-9c.556.992 1.164 2.02 1.759 3h-17.65a102 102 0 0 0 1.759-3zM311 979h-8v8h8z" 
            style={{ fillOpacity: 0.76, fill: style?.fill || "#000" }} 
          />
          <path d="M299 974v38h-2l-3-3v-33.5l3-1.5z" fill="#7B7A7A" />
          <path d="M276 1010h-4v9h4zm24-36h5l10 5v7l-3 3v16l-7 7h-5zm-17.175 28c1.642 2.7 3.175 5 3.175 5s0 1-1 1h-22c-1 0-1-1-1-1s1.533-2.3 3.175-5zM293 976v32l-3-3v-16l-3-3v-7zm-26.066 23c.389-.696.752-1.372 1.066-2 2-4 6-32 6-32s4 28 6 32c.314.628.677 1.304 1.066 2zM307 980.879l1.414-1.415a1.5 1.5 0 0 1 2.122 0 1.5 1.5 0 0 1 0 2.122L309.121 983l1.415 1.414a1.5 1.5 0 0 1 0 2.122 1.5 1.5 0 0 1-2.122 0L307 985.121l-1.414 1.415a1.5 1.5 0 0 1-2.122 0 1.5 1.5 0 0 1 0-2.122l1.415-1.414-1.415-1.414a1.5 1.5 0 0 1 0-2.122 1.5 1.5 0 0 1 2.122 0z" fill="#B5B5B5" />
        </g>
      </g>
    </g>
  );
};