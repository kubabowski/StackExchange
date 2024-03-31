// DataContext.ts
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchTagsByNumber } from "../utils";

export interface HeadCell {
  id: keyof Data;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tag",
  },
  {
    id: "questions",
    numeric: true,
    disablePadding: false,
    label: "Liczba powiązanych pytań",
  },
];

export interface Data {
  id: number;
  name: string;
  questions: number;
}

let rows: Data[] = [];

export async function fetchAndUpdateRows(
  page: number = 1
): Promise<Data[] | undefined> {
  try {
    const tags = await fetchTagsByNumber(150);
    const fetchedRows: Data[] = tags.map((item: any, index: number) => ({
      id: index + 1,
      name: item.name,
      questions: item.count,
    }));
    return fetchedRows;
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

async function initializeRows() {
  const fetchedRows = await fetchAndUpdateRows();
  if (fetchedRows && fetchedRows.length > 0) {
    rows = fetchedRows;
  }
}

initializeRows();

export { rows };

interface DataContextProps {
  loading: boolean;
  data: Data[];
}

const DataContext = createContext<DataContextProps>({
  loading: true,
  data: [],
});

interface DataContextProviderProps {
  children: ReactNode;
}

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAndUpdateRows();
        if (fetchedData && fetchedData.length > 0) {
          setData(fetchedData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  return (
    <DataContext.Provider value={{ loading, data }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
