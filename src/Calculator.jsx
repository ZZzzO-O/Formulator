import { useState } from 'react';

const btnValues = [
  "√", "x²", "^", "π", "⌦", "C",  
  "7", "8", "9", "%", "(", ")",       
  "4", "5", "6", "*", "+", "log",    
  "1", "2", "3", "-", "/", "ln",    
  "0", ".", "00", "000", "0000", "="        
];

function Calculator() {
  const [calc, setCalc] = useState("");  
  const [history, setHistory] = useState([]); 
  const [isFinished, setIsFinished] = useState(false); 

  const handleInput = (value) => {
    if (value === "C") {
      setCalc("");
    } else if (value === "⌦") {
      setCalc(calc.slice(0, -1));
    } else if (value === "=") {
      try {
        let formattedCalc = calc
          .replace(/\^/g, "**")
          .replace(/π/g, Math.PI.toString())
          .replace(/log\(/g, "Math.log10(")
          .replace(/ln\(/g, "Math.log(");
        const result = new Function(`return ${formattedCalc}`)();
        let finalResult;
    if (Math.abs(result) > 1e12) {
      finalResult = result.toExponential(4); // e.g. 1.2345e+15
    } else {
      finalResult = Number(result.toFixed(6)).toString();
    }
        setHistory(prev => [`${calc} = ${finalResult}`, ...prev].slice(0, 10));
        setCalc(Number(result.toFixed(6)).toString());
        setIsFinished(true);
      } catch {
        setCalc("Error");
      }
    } else if (value === "√") {
      try {
        const currentVal = new Function(`return ${calc || "0"}`)();
        setCalc(Math.sqrt(currentVal).toString());
      } catch { setCalc("Error"); }
    } else if (value === "x²") {
      try {
        const currentVal = new Function(`return ${calc || "0"}`)();
        setCalc(Math.pow(currentVal, 2).toString());
      } catch { setCalc("Error"); }
    } else if (value === "log" || value === "ln") {
      
      setCalc(calc + value + "(");
    } else {
      
      if (isFinished && !isNaN(value)) {
        setCalc(value);
      } else {
        if (calc.length < 20) {
          setCalc(calc === "0" ? value : calc + value);
        }
      }
      setIsFinished(false);
    }
  };

  return (
  <div className="calculator-page-layout">
    
    <div className="calc-history-sidebar">
      <h3>History</h3>
      <button onClick={() => setHistory([])} className="clear-history">🧹</button> 
    

      <div className="history-list">
      {history.length === 0 ? (
        <p className="empty-msg">No data yet</p>
      ) : (
        history.map((item, i) => (
          <div 
            key={i} 
            className="history-card" 
            onClick={() => {
              // This grabs the answer part and puts it in the display
              setCalc(item.split('=')[1].trim());
              // This tells the app: "If the user types a number now, start a new math problem"
              setIsFinished(true); 
            }}
          >
            <span className="history-math">{item.split('=')[0]}</span>
            <span className="history-result">= {item.split('=')[1]}</span>
          </div>
        ))
      )}
    </div>
  </div>

    
    <div className="calculator-wrapper">
      <div className="calc-display">
        <div className="formula-preview">{calc || "0"}</div>
      </div>

      <div className="keypad">
        {btnValues.map((btn, index) => (
          <button 
            key={index} 
            onClick={() => handleInput(btn)} 
            className={`${btn === "=" ? "equals-btn" : ""} ${btn === "0" ? "zero-btn" : ""}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  </div>
);
}

export default Calculator;