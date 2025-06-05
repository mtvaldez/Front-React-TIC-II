import { queryClient } from "@/query/queryClient";

export const refetchDoors = () =>
    queryClient.invalidateQueries({ queryKey: ['doors'] });

export const refetchUsers = () =>
    queryClient.invalidateQueries({ queryKey: ['users'] });
