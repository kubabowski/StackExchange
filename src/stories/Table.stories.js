import Table from "../components/table";
import { fetchTagsByNumber } from "../utils";

export default {
  title: "Table",
  component: Table,
};

// export const defaultTable = () => {
//   return <Table fetchDataFunction={fetchTagsByNumber(10)} />;
// };
// export const defaultTable = () => <Table />;

export const defaultTable = () => {
  const fetchDataFunction = async () => {
    return await fetchTagsByNumber(10);
  };

  return <Table fetchDataFunction={fetchDataFunction} />;
};
