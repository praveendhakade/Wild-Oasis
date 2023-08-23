// import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "../../ui/table/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const  [searchParams ] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }
  if (!cabins) return <Empty resourceName= "Cabins"/>


  const filterValue = searchParams?.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1: -1;
  const sortedCabins = filteredCabins.sort((a,b) => (a[field] - b[field]) * modifier) ;
  
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          // data={filteredCabins}
          render={(cabin) => {
            return <CabinRow key={cabin.id} cabin={cabin} />;
          }}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
