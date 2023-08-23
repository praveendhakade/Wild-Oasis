import TableOperations from "../../ui/table/TableOperations";
import Filter from "../../ui/table/Filter";
import SortBy from "../../ui/table/SortBy";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          {
            value: "maxCapacity-asc",
            label: "Sort by max capacity (low first)",
          },
          { value: "maxCapacity-desc", label: "Sort by max capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
