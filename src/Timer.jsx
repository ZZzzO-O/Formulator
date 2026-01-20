import { useState, useEffect } from 'react';

function Timer({ 
  seconds, 
  setSeconds, 
  isActive, 
  setIsActive, 
  mode, 
  setMode 
  }) {


  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      alert(`${mode} session is over!`);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, mode]);

  const changeMode = (newMode, mins) => {
    setMode(newMode);
    setSeconds(mins * 60);
    setIsActive(false);
  };

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer-container">
      <div className="mode-selector">
        <button onClick={() => changeMode('Study', 25)}>Study With Me</button>
        <button onClick={() => changeMode('Short Break', 5)}>Short Break</button>
        <button onClick={() => changeMode('Long Break', 10)}>Long Break</button>
      </div>

             <div className="timer-display">
        <h1>{mode}</h1>
        <div className="digits">{formatTime()}</div>
      </div>

      <div className="timer-controls">
        <button className="start-btn" onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pause' : 'Start'}
        </button>

        <button className="reset-btn" onClick={() => { setIsActive(false); setSeconds(1500); }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;