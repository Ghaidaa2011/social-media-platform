import { useQuery } from "@tanstack/react-query";
import api from "../../services/axios-global"
import { IUser } from "../../types/user.types";

interface responseType {
  data: IUser
}
const getUser = async (id: number, signal?: AbortSignal): Promise<IUser> => {
  const { data } = await api.get<responseType>(`/users/${id}`, { signal });
  return data.data
}

const useGetUser = (id: number) => {
  return useQuery<IUser, Error>({
    queryKey: ["user", "info", id],
    queryFn: ({ signal }) => getUser(id, signal),
    enabled: !!id,
    refetchOnWindowFocus: false,
  })
}
export default useGetUser