import { useRef, useState, useEffect } from 'react';

function SketchPad() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil'); // pencil, eraser, or highlighter
  const [color, setColor] = useState('#000000');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const handleResize = () => {
      const sidebar = canvas.parentElement;
      const tempImage = canvas.toDataURL();
      canvas.width = sidebar.clientWidth;
      canvas.height = sidebar.clientHeight;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = tempImage;
      img.onload = () => ctx.drawImage(img, 0, 0);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = tool === 'highlighter' ? 25 : 2;
      ctx.globalAlpha = tool === 'highlighter' ? 0.3 : 1.0;
    }

    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };
  
  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'my-notes.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="whiteboard-container" style={{ height: '100%' }}>
      <div className="toolbar">
        <button onClick={() => setTool('pencil')} className={tool === 'pencil' ? 'active' : ''}>Pencil</button>
        <button onClick={() => setTool('highlighter')} className={tool === 'highlighter' ? 'active' : ''}>Highlighter</button>
        <button onClick={() => setTool('eraser')} className={tool === 'eraser' ? 'active' : ''}>Erase</button>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button onClick={downloadImage}>Save📥</button>
        <button onClick={() => canvasRef.current.getContext('2d').clearRect(0,0,9999,9999)}>🗑️</button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => setIsDrawing(false)}
        className={`whiteboard-canvas ${tool}-cursor`}
      />
    </div>
  );
}

export default SketchPad;