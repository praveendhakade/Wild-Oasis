import {useMutation, useQueryClient} from "@tanstack/react-query";
import { logout as logoutApi } from "../../../services/apiAuth";
import {useNavigate} from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryCliet = useQueryClient()
    const {mutate: logout, isLoading} = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryCliet.removeQueries();
            navigate("/login", {replace: true})
        }
    })

    return {logout, isLoading}
}