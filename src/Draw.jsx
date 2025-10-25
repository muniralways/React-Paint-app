import React, { useEffect, useRef, useState } from 'react';
import Menu from './Menu';

const Draw = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState('black');
  const [lineOpacity, setLineOpacity] = useState(1);
  const [hasDrawing, setHasDrawing] = useState(false);

  // 🖌️ ব্যাকগ্রাউন্ড নিয়ন্ত্রণ
  const [includeBg, setIncludeBg] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');

  const [popup, setPopup] = useState(null);

  // 🖍️ Initial setup + Update brush settings
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 700;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = lineOpacity;
    ctxRef.current = ctx;

    // ব্যাকগ্রাউন্ড প্রয়োগ
    if (includeBg) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [lineColor, lineWidth, lineOpacity, includeBg, bgColor]);

  // আঁকার শুরু
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // আঁকা শেষ
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    setHasDrawing(true);
  };

  // লাইন আঁকা
  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  // Popup দেখানো
  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(null), 3000);
  };

  // Export PNG
  const saveDrawing = () => {
    if (!hasDrawing) {
      showPopup('⚠️ আপনি কিছু আঁকেননি!');
      return;
    }

    const canvas = canvasRef.current;
    if (includeBg) {
      // রঙসহ ব্যাকগ্রাউন্ড প্রয়োগ
      const ctx = ctxRef.current;
      const temp = document.createElement('canvas');
      temp.width = canvas.width;
      temp.height = canvas.height;
      const tempCtx = temp.getContext('2d');

      tempCtx.fillStyle = bgColor;
      tempCtx.fillRect(0, 0, temp.width, temp.height);
      tempCtx.drawImage(canvas, 0, 0);

      const link = document.createElement('a');
      link.download = 'drawing_with_bg.png';
      link.href = temp.toDataURL('image/png');
      link.click();
    } else {
      const link = document.createElement('a');
      link.download = 'drawing_transparent.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }

    showPopup('✅ Export সফল হয়েছে!');
  };

  // Clear Canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (includeBg) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setHasDrawing(false);
    showPopup('🧽 ক্যানভাস পরিষ্কার হয়েছে!');
  };

  return (
    <div className="App">
      {popup && <div className="popup">{popup}</div>}

      <div className="container">
        
      <h1>🎨 Paint App</h1>
        {/* বাম পাশে ক্যানভাস */}
        <div className="draw-area">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseMove={draw}
            style={{ cursor: 'crosshair' }}
          />
        </div>

        {/* ডান পাশে মেনু */}
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
              ব্যাকগ্রাউন্ডসহ PNG
            </label>
          </div>

          {includeBg && (
            <div>
              <label>🎨 ব্যাকগ্রাউন্ড কালার</label>
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
