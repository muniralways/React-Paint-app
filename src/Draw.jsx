import React, { use } from 'react'

const Draw = () => {
 
 const canvsRef = React.useRef(null);
 const ctxRef = React.useRef(null);
 const [isDrawing, setIsDrawing] = React.useState(false);
   const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(0.1);
 
 useEffect(( ) =>{
    const canvas = canvsRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.line.Join = "round";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = lineOpacity;
    ctxRef.current = ctx;
 })
    return (
    <div>
      <div className="App">
        <h1>Paint App</h1>
        <div className="draw-area">
            <canvas
            
            width={`1280px`}
            height={`720px`}
            >

            </canvas>
        </div>
      </div>
    </div>
  )
}

export default Draw
