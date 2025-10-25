import React from 'react';

const Menu = ({ setLineColor, setLineWidth, setLineOpacity }) => {
  return (
    <>
      <label>🎨 Brush Color</label>
      <input type="color" onChange={(e) => setLineColor(e.target.value)} />

      <label>🖋️ Brush Width</label>
      <input
        type="range"
        min="3"
        max="50"
        defaultValue="5"
        onChange={(e) => setLineWidth(e.target.value)}
      />

      <label>🌫️ Opacity</label>
      <input
        type="range"
        min="10"
        max="100"
        defaultValue="100"
        onChange={(e) => setLineOpacity(e.target.value / 100)}
      />
    </>
  );
};

export default Menu;
