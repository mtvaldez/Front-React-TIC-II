import { getDoors } from "@/services/DoorService"
import { useQuery } from "react-query"

export const useQueryDoor = () => {
    return useQuery( {
        queryKey: ['doors'],
        queryFn: getDoors,
        refetchOnWindowFocus: false
    })
}