import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSetting = () => {

    const querClient = useQueryClient();

    const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success("Settings successfully edited");
        querClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  return {isUpdating, updateSetting}
};


