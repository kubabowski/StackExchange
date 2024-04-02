import React, { useEffect } from "react";
import EnhancedTable from "./ui/EnhancedTable";

import { Data, fetchTagsByNumber } from "../../utils";
import { useDataContext } from "../../DataContext";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

// export interface Data {
//   id: number;
//   name: string;
//   questions: number;
// }

let rows: Data[] = [];

interface TableProps {
  // fetchDataFunction: () => Promise<Data[] | undefined>;
  fetchDataFunction: () => Promise<Data[] | undefined>;
}

export { rows };

const Table: React.FC<TableProps> = ({ fetchDataFunction }) => {
  const { loading, error } = useDataContext();
  useEffect(() => {
    async function fetchAndUpdateRows(
      page: number = 1
    ): Promise<Data[] | undefined> {
      try {
        const data = await fetchDataFunction();
        if (data) {
          const fetchedRows: Data[] = data.map((item: any, index: number) => ({
            id: index + 1,
            name: item.name,
            questions: item.count,
          }));
          return fetchedRows;
        } else {
          return [];
        }
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
  }, [fetchDataFunction]);

  return (
    <div>
      <EnhancedTable headCells={headCells} />
    </div>
  );
};

export default Table;
