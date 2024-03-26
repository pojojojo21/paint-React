import "./App.css";
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [color, setColor] = useState('#f00000'); // Initial color state
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(3); // Initial lineWidth state
  const [eraser, setEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round'; // Set line cap to round for smoother lines

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const handleMouseMove = (e) => {
      if (isDrawing) {
        ctx.lineWidth = lineWidth;
        if (eraser) {
          ctx.strokeStyle = '#ffffff'; // Set stroke color to white for eraser
        } else {
          ctx.strokeStyle = color; // Set stroke color
        }
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [color, isDrawing]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  };

  return (
    <>
      <header>
        <h1>Paint Tool</h1>
      </header>
      <div className="column">
        <div className="row">
          <div className="element"><input type="color" value={color}
            onChange={(e) => setColor(e.target.value)} /></div>
          <div className="element"><input id="width-slider" type="range" min="1" max="10" value={lineWidth}
            onChange={(e) => setLineWidth(e.target.value)} /></div>
          <div className="element"><button id="eraserButton"
            style={{ backgroundColor: eraser ? '#00a03e' : '#03d052' }}
            onClick={() => setEraser(!eraser)}>Eraser</button></div>
          <div className="element"><button id="clearButton"
            onClick={() => clearCanvas()}>Clear All</button></div>
        </div>
        <div>
          <canvas ref={canvasRef} width={800} height={500}></canvas>
        </div>
      </div>
    </>
  );
}

export default App;