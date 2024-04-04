import { useState } from "react";
import "./App.css";
import Table from "./components/table";
import { fetchTagsByNumber } from "./utils";
import { Box, TextField } from "@mui/material";
import { DataContextProvider } from "./DataContext";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [isValidInput, setIsValidInput] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const parsedValue = parseInt(value);
    setNumber(isNaN(parsedValue) ? undefined : parsedValue);
    setIsValidInput(
      !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 2500
    );
  };

  const fetchDataFunction = () => {
    if (isValidInput) {
      return fetchTagsByNumber(number);
    } else {
      return fetchTagsByNumber(10);
    }
  };

  return (
    <DataContextProvider number={number ? number : undefined}>
      <div className="App">
        <Box width={900} margin="auto" marginTop={10}>
          <section className="tags-table">
            <TextField
              error={!isValidInput}
              id="outlined-number"
              value={inputValue}
              label={
                isValidInput
                  ? `Podaj liczbę tagów`
                  : `Podaj liczbę pomiędzy 1 a 2500`
              }
              variant="standard"
              name="number"
              onChange={handleInputChange}
              sx={{ marginBottom: "15px", width: "300px" }}
            />

            <Table fetchDataFunction={fetchDataFunction} />
          </section>
        </Box>
      </div>
    </DataContextProvider>
  );
}

export default App;
