import "./App.css";
import Table from "./components/table";

function App() {
  return (
    <div className="App">
      <header className="App-header">Tags table</header>
      <body>
        <section className="tags-table">
          <Table />
        </section>
      </body>
    </div>
  );
}

export default App;
