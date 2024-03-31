import axios from "axios";

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
    console.error("Error fetching data:", error);
    throw error;
  }
}
