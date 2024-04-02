import axios, { AxiosError } from "axios";

export interface Data {
  [key: string]: any;
}

export const stackExchangeApi = axios.create({
  baseURL: "https://api.stackexchange.com/2.3/tags",
});

export async function fetchTagsByNumber(number: number): Promise<Data[]> {
  try {
    const pageSize = Math.min(number, 100);
    const page = Math.ceil(number / pageSize);

    const response = await stackExchangeApi.get(
      `?site=stackoverflow&pagesize=${pageSize}&page=${page}`
    );

    const data: Data[] = response.data.items.map((item: any) => {
      const data: Data = {};
      for (const key in item) {
        data[key] = item[key];
      }
      return data;
    });

    return data;
  } catch (error) {
    if (
      error &&
      (error as AxiosError).response &&
      (error as AxiosError).response?.status === 400
    ) {
      console.error("Error fetching data:", error);
      throw new Error("Nie można tagów. Spróbuj wprowadzić inną liczbę.");
    } else {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

// DUMMY DATA DUE TO STACKEXCHANGE LIMITS
// const fetchTagsByNumber = async (number?: number): Promise<Data[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   const mockData: Data[] = [];
//   for (let i = 1; i <= 100; i++) {
//     mockData.push({ id: i, name: `Tag ${i}`, questions: i * 10 });
//   }

//   const filteredData = number ? mockData.slice(0, number) : mockData;

//   return filteredData;
// };

// export { fetchTagsByNumber };
