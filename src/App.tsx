import './App.css';
import EnhancedTable from './components/EnhancedTable'

function App() {

  const rows = [
    { id: 1, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 2, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    // Add more rows as needed
  ];

  const headCells = [
    { id: 'name', label: 'Dessert (100g serving)', numeric: false, disablePadding: true },
    { id: 'calories', label: 'Calories', numeric: true, disablePadding: false },
    { id: 'fat', label: 'Fat (g)', numeric: true, disablePadding: false },
    { id: 'carbs', label: 'Carbs (g)', numeric: true, disablePadding: false },
    { id: 'protein', label: 'Protein (g)', numeric: true, disablePadding: false },
  ];

  return (
    <div className="App">
      <header className="App-header">
        Tags table
      </header>
      <body>
      <EnhancedTable />
      </body>
    </div>
  );
}

export default App;
