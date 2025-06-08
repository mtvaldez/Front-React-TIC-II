import { getDoorsPaginated } from "@/services/DoorService"
import { useQuery } from "react-query"

export const useQueryDoor = (pNum, pSize, name) => {
    return useQuery( {
        queryKey: ['doors', pNum, name],
        queryFn: () => getDoorsPaginated(pNum, pSize, name),
        refetchOnWindowFocus: false
    })
}