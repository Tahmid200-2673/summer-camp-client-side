import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
const useCart = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://b7a12-summer-camp-server-side.vercel.app/carts?email=${user?.email}`)
            return res.json();
        },
    })

    return [cart, refetch]

}
export default useCart;