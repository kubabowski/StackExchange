import axios from "axios";

interface Tag {
  name: string;
  count: number;
}

export const stackExchangeApi = axios.create({
  baseURL: "https://api.stackexchange.com/2.3/tags",
});

export async function fetchTagsByNumber(number: number): Promise<Tag[]> {
  try {
    const pageSize = Math.min(number, 100);
    const page = Math.ceil(number / pageSize);

    const response = await stackExchangeApi.get(
      `?site=stackoverflow&pagesize=${pageSize}&page=${page}`
    );

    const tags: Tag[] = response.data.items.map((item: any) => ({
      name: item.name,
      count: item.count,
    }));

    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}
