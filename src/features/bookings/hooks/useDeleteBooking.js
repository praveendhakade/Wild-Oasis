import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking as deleteBookingApi } from "../../../services/apiBookings";
import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  // const {bookingId} = useParams()
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn:  deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {isDeleting, deleteBooking}
};
