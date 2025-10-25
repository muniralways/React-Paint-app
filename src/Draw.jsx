import React, { useRef, useState, useEffect } from 'react';
import Menu from './Menu';

const Draw = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(20);
  const [lineColor, setLineColor] = useState('#ff0000');
  const [lineOpacity, setLineOpacity] = useState(0.5);
  const [hasDrawing, setHasDrawing] = useState(false);

  const [includeBg, setIncludeBg] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');

  const [popup, setPopup] = useState(null);

  // Canvas setup (only once)
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 700;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctxRef.current = ctx;

    if (includeBg) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [lineWidth, lineColor, lineOpacity, includeBg, bgColor]);

  // Start drawing
  const startDrawing = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    lastPosRef.current = { x, y };
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const last = lastPosRef.current;

    // Set hasDrawing to true when drawing starts
    setHasDrawing(true);

    const ctx = ctxRef.current;
    ctx.strokeStyle = `rgba(${parseInt(lineColor.slice(1, 3), 16)}, ${parseInt(lineColor.slice(3, 5), 16)}, ${parseInt(lineColor.slice(5, 7), 16)}, ${lineOpacity})`;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = 1; // Reset globalAlpha for each stroke

    // Smooth line
    ctx.quadraticCurveTo(last.x, last.y, (last.x + x) / 2, (last.y + y) / 2);
    ctx.stroke();

    lastPosRef.current = { x, y };
  };

  // End drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  // Popup
  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(null), 3000);
  };

  // Export drawing
  const saveDrawing = () => {
    if (!hasDrawing) {
      showPopup('⚠️ You did not draw anything!');
      return;
    }

    const canvas = canvasRef.current;
    const temp = document.createElement('canvas');
    temp.width = canvas.width;
    temp.height = canvas.height;
    const tempCtx = temp.getContext('2d');

    // Step 1: Draw the background if it's enabled
    if (includeBg) {
      tempCtx.fillStyle = bgColor;
      tempCtx.fillRect(0, 0, temp.width, temp.height);
    }

    // Step 2: Draw the current canvas content (your drawings)
    tempCtx.drawImage(canvas, 0, 0);

    // Step 3: Export the drawing with or without background
    const link = document.createElement('a');
    link.download = includeBg ? 'drawing_with_bg.png' : 'drawing_transparent.png';
    link.href = temp.toDataURL('image/png');
    link.click();

    showPopup('✅ Export successful!');
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    // Clear only current content
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw background manually if necessary
    if (includeBg) {
      ctx.save();
      ctx.globalAlpha = 1; // Ensure full opacity for background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    setHasDrawing(false);
    showPopup('🧽 Canvas cleared!');
  };

  return (
    <div className="App">
      {popup && <div className="popup">{popup}</div>}
      <div className="title">🎨 Paint App</div>
      <div className="container">
        <div className="draw-area">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseMove={draw}
            style={{ cursor: 'crosshair', border: '2px solid black' }}
          />
        </div>

        <div className="menu-panel">
          <Menu
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            setLineOpacity={setLineOpacity}
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeBg}
                onChange={(e) => setIncludeBg(e.target.checked)}
              />{' '}
              Background PNG
            </label>
          </div>

          {includeBg && (
            <div>
              <label>🎨 Background color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          )}

          <button onClick={saveDrawing}>💾 Export</button>
          <button onClick={clearCanvas}>🧽 Clear</button>
        </div>
      </div>
    </div>
  );
};

export default Draw;
