import { getAdminsPaginated } from "@/services/AdminService"
import { useQuery } from "react-query"

export const useQueryAdmin = (pNum, pSize, name) => {
    return useQuery( {
        queryKey: ['admins', pNum, name],
        queryFn: () => getAdminsPaginated(pNum, pSize, name),
        refetchOnWindowFocus: false
    })
}