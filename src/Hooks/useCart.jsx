import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";


const useCart = () => {
    const axiosSecure = useAxios()
    const {user} = useAuth()
    // tanStack query
   const {data: carts=[], refetch } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/carts?email=${user?.email}`)
        return res.data
    }
   })
   return [carts, refetch]
};

export default useCart;