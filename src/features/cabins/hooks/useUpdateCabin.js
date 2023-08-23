import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useUpdateCabin = () => {

    const querClient = useQueryClient();

    const { isLoading: isEditing, mutate: editCabin } = useMutation({
      mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
      onSuccess: () => {
        toast.success("Cabin successfully edited");
        querClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  return {isEditing, editCabin}
};


