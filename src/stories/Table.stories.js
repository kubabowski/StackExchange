import React, { useState } from "react";
import { DataContextProvider } from "../DataContext";
import Table from "../components/table";
import { fetchTagsByNumber } from "../utils";
import { TextField } from "@mui/material";

export default {
  title: "Table",
  component: Table,
};

export const defaultTable = () => {
  const [inputValue, setInputValue] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchDataFunction = async () => {
    const parsedInputValue = parseInt(inputValue);
    if (isNaN(parsedInputValue)) {
      return;
    }
    try {
      return await fetchTagsByNumber(parsedInputValue);
    } catch (error) {
      setErrorMessage("Nie można pobrać tagów. Spróbuj ponownie.");
      return [];
    }
  };

  return (
    <DataContextProvider number={parseInt(inputValue)}>
      <div style={{ padding: "20px" }}>
        <TextField
          id="outlined-number"
          value={inputValue}
          label="Podaj liczbę tagów"
          variant="standard"
          name="number"
          onChange={handleInputChange}
          sx={{ marginBottom: "15px" }}
        />
        {errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <Table fetchDataFunction={fetchDataFunction} />
        )}
      </div>
    </DataContextProvider>
  );
};
