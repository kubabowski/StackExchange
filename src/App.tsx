import { useState } from "react";
import "./App.css";
import Table from "./components/table";
import { Data, fetchTagsByNumber } from "./utils";
import { Box, Button, TextField } from "@mui/material";
import { DataContextProvider } from "./DataContext";
// import { DataContextProvider } from "./DataContext";

function App() {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState<number | undefined>(undefined);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setInputValue(isNaN(value) ? undefined : value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      setIsLoading(true);
      try {
        const fetchedTags = await fetchTagsByNumber(inputValue);
        setNumber(inputValue);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setNumber(undefined);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchDataFunction = () => {
    if (typeof number === "number") {
      return fetchTagsByNumber(number);
    } else {
      return fetchTagsByNumber(100);
    }
  };

  return (
    <DataContextProvider number={typeof number === "number" ? number : 100}>
      <div className="App">
        <Box width={900} margin="auto" marginTop={10}>
          <section className="tags-table">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              display="flex"
              alignItems="center"
              justifyContent="end"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="outlined-number"
                value={inputValue || ""}
                label="Podaj liczbę tagów"
                type="number"
                onChange={handleInputChange}
                // placeholder="Liczba tagów"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button type="submit" variant="contained">
                Szukaj
              </Button>
            </Box>
            <Table fetchDataFunction={fetchDataFunction} />
          </section>
        </Box>
      </div>
    </DataContextProvider>
  );
}

export default App;
