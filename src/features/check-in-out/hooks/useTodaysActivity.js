import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../../services/apiBookings"

export const useTodaysActivity = () => {
    const {isLoading, data: activities} = useQuery({
        queryKey: ["today-activity"],
        queryFn: getStaysTodayActivity
    })

    return {activities, isLoading}
}