import { getUsers, getUsersPaginated } from "@/services/UserService"
import { useQuery } from "react-query"

export const useQueryUser = (pNum, pSize, name) => {
    return useQuery( {
        queryKey: ['users', pNum, name],
        queryFn: () => getUsersPaginated(pNum, pSize, name),
        refetchOnWindowFocus: false
    })
}