import styled from "styled-components";
import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from "./hooks/useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import {useCabins} from "../cabins/hooks/useCabins"
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodaysActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const {isLoading, bookings} = useRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays, numDays  } = useRecentStays();

  const {cabins, isLoading: isLoadingCabins} = useCabins();

  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodaysActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
};

export default DashboardLayout;
