import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { fetchTagsByNumber } from "../utils";

export interface Data {
  [key: string]: any;
}

const DataContext = createContext<{
  loading: boolean;
  error: any;
  fetchData: (number: number) => Promise<void>;
}>({
  loading: false,
  error: null,
  fetchData: () => new Promise(() => {}),
});

export const useDataContext = () => useContext(DataContext);

export const DataContextProvider: React.FC<{
  children: ReactNode;
  number?: number;
}> = ({ children, number }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (number: number) => {
    setLoading(true);
    try {
      await fetchTagsByNumber(number);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (number !== undefined) {
      fetchData(number);
    }
  }, [number]);

  return (
    <DataContext.Provider value={{ loading, error, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
