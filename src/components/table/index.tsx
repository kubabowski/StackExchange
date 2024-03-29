import React from "react";
import EnhancedTable from "./partials/EnhancedTable";
import EnhancedTableHead from "./partials/EnhancedTableHead";
import { Data, rows } from "./utils/data";

const Table = () => {
  const enhancedTableHeadProps = {
    numSelected: 0,
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => {},
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => {},
    order: "asc" as const,
    orderBy: "name",
    rowCount: 0,
  };

  return (
    <div>
      <EnhancedTable />
      <EnhancedTableHead {...enhancedTableHeadProps} />
    </div>
  );
};

export default Table;
