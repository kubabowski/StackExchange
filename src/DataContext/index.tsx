import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { fetchTagsByNumber } from "../utils";

// Define your Data interface
export interface Data {
  [key: string]: any;
}

// Create a context with initial values
const DataContext = createContext<{
  loading: boolean;
  error: any;
  fetchData: (number: number) => Promise<void>;
}>({
  loading: false,
  error: null,
  fetchData: () => new Promise(() => {}),
});

// Export a custom hook to access the context
export const useDataContext = () => useContext(DataContext);

// Context provider component
export const DataContextProvider: React.FC<{
  children: ReactNode;
  number: number;
}> = ({ children, number }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Function to fetch data
  const fetchData = async (number: number) => {
    setLoading(true);
    try {
      const fetchedData = await fetchTagsByNumber(number);
      // setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(number);
    console.log(loading, error);
  }, [number]);

  return (
    <DataContext.Provider value={{ loading, error, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
