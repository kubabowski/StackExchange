import { useState } from "react";
import "./App.css";
import Table from "./components/table";
import { fetchTagsByNumber } from "./utils";
import { Box, TextField } from "@mui/material";
import { DataContextProvider } from "./DataContext";

function App() {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const [number, setNumber] = useState<number | undefined>(undefined);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setInputValue(isNaN(value) ? undefined : value);
    setNumber(isNaN(value) ? undefined : value);
  };

  const fetchDataFunction = () => {
    if (typeof number === "number") {
      console.log("number of questions is", number);
      return fetchTagsByNumber(number);
    } else {
      console.log("number of questions is", "10");
      return fetchTagsByNumber(10);
    }
  };

  fetchDataFunction();

  return (
    <DataContextProvider number={number ? number : undefined}>
      <div className="App">
        <Box width={900} margin="auto" marginTop={10}>
          <section className="tags-table">
            <TextField
              id="outlined-number"
              value={inputValue || ""}
              label="Podaj liczbę tagów"
              variant="standard"
              name="number"
              onChange={handleInputChange}
              sx={{ marginBottom: "15px" }}
            />

            <Table fetchDataFunction={fetchDataFunction} />
          </section>
        </Box>
      </div>
    </DataContextProvider>
  );
}

export default App;
