import { useState } from 'react'
import Calculator from './Calculator'
import Notes from './Notes'
import Timer from './Timer'
import FormulaSheet from './FormulaSheet'
import './App.css'

function App() {
const [seconds, setSeconds] = useState(1500);
const [isActive, setIsActive] = useState(false);
const [mode, setMode] = useState('Study');

  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    setIsLight(!isLight);
  };
  const [activeTool, setActiveTool] = useState('calc');
  return (
    <div className={`app-container ${isLight ? 'light-mode' : 'dark-mode'}`}>
      <nav className="nav-bar">
        <div className="nav-left">
          <h1>Formulator</h1>
        </div>
  
        <div className="nav-center">
          <span onClick={() => setActiveTool('timer')}>Timer</span>
          <span onClick={() => setActiveTool('calc')}>Calculator</span>
          <span onClick={() => setActiveTool('formula')}>Formula</span>
          <a 
            href="https://www.desmos.com/calculator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            Graphing Calc
          </a>
        </div>
        
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme}>
            {isLight ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
      
      <main className="calculator-area">
        {activeTool === 'calc' && <Calculator />}
        <div style={{ display: activeTool === 'timer' ? 'block' : 'none' }}>
          <Timer
            seconds={seconds}
            setSeconds={setSeconds}
            isActive={isActive}
            setIsActive={setIsActive}
            mode={mode}
            setMode={setMode}
          />
        </div>

       

        {activeTool === 'formula' && <FormulaSheet />}        
      </main>

      <aside className="notes-area">
        <Notes />
      </aside>

            
    </div>
  )
}

export default App