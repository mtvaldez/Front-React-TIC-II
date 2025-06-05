import { getUsers } from "@/services/UserService"
import { useQuery } from "react-query"

export const useQueryUser = () => {
    return useQuery( {
        queryKey: ['users'],
        queryFn: getUsers,
        refetchOnWindowFocus: false
    })
}