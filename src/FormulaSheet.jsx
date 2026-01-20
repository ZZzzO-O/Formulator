import { useState } from 'react';

function FormulaSheet() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selected, setSelected] = useState(null);

  const formulaData = [
    {
      category: "Area",
      items: [
        { name: "Square", eq: "A = s²" },
        { name: "Rectangle", eq: "A = lw" },
        { name: "Parallelogram", eq: "A = bh" },
        { name: "Triangle", eq: "A = 1/2bh" },
        { name: "Trapezoid", eq: "A = 1/2h (a + b)" },
        { name: "Circle", eq: "A = πr²" }
        
      ]
    },
    {
      category: "Perimeter",
      items: [
        { name: "Square", eq: "P = 4s" },
        { name: "Rectangle", eq: "P = 2l + 2w" },
        { name: "Parallelogram", eq: "P = 2a + 2b" },
        { name: "Triangle", eq: "P = s₁ + s₂ + s₃" },        
        { name: "Circumference of a Circle", eq: "P = 2πr or C = πd; π= 3.14" }
        
      ]
    },
    {
      category: "Surface Area",
      items: [
        { name: "Rectangular Prism", eq: "SA = 2lw + 2lh + 2wh" },
        { name: "Right Prism", eq: "SA = ph + 2B" },
        { name: "Cylinder", eq: "SA = 2πrh + 2πr²" },
        { name: "Pyramid", eq: "SA = 1/2ps + B" },
        { name: "Cone", eq: "SA = πrs + πr²" },
        { name: "Sphere", eq: "SA = 4πr²" }
      ]
    },
    {
      category: "Volume",
      items: [
        { name: "Rectangular Prism", eq: "V = lwh" },
        { name: "Right Prism", eq: "V = Bh" },
        { name: "Cylinder", eq: "V = πr²h" },
        { name: "Pyramid", eq: "V = 1/3Bh" },
        { name: "Cone", eq: "V = 1/3πr²h" },
        { name: "Sphere", eq: "V = 4/3πr³" }
      ]
    },
    {
      category: "Data",
      items: [
        { name: "mean", eq: "The total of the values of a data set, divided by the number of elements in the data set" },
        { name: "median", eq: "The middle value in an odd number of ordered values of a data set or the mean of the two middle values in an even number of ordered values in a data set" }
      ]
    },
    {
      category: "Algebra",
      items: [
        { name: "Slope of a Line", eq: "m = (y₂ - y₁) / (x₂ - x₁)" },
        { name: "Point - Slope Form of the equation of a line", eq: "y - y₁ = m(x - x₁)" },
        { name: "Slope - Intercept Form of a line", eq: "y = mx + b" },
        { name: "Standard Form of a quadratic equation", eq: "y = ax² + bx + c" },
        { name: "Quadratic Formula", eq: "x = (-b ± √b² - 4ac) / 2a" },
        { name: "Pythagorean Theorem", eq: "a² + b² = c²" },
        { name: "Simple Interest", eq: "I = Prt" },
        { name: "Distance Formula", eq: "d = rt" },
        { name: "Total cost", eq: "total cost = (number of units) x (price per unit)"}
      ]
    }
  ];

  const filteredData = formulaData.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="formula-page">
      <input 
        type="text" 
        placeholder="Search formulas..." 
        className="formula-search-bar"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.map((section, idx) => (
        <div key={idx} className="formula-section">
          <h2 className="section-header">{section.category}</h2>
          <div className="card-grid">
            {section.items.map((item, i) => (
              <div 
                key={i} 
                className={`formula-card ${selected === item.name ? 'active-formula' : ''}`}
                onClick={() => setSelected(item.name)}
              >
                <span className="formula-name">{item.name}</span>
                <span className="formula-eq">{item.eq}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormulaSheet;