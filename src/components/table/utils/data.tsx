import { fetchTagsByNumber } from "../../../utils/index";

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
    console.log("1", rows);
  }
}

initializeRows().then(() => {
  console.log("2", rows);
});

export { rows };
