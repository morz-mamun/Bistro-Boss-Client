
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    // using tanStack

    const axiosPublic = useAxiosPublic()

    const {data: menus = [], refetch} = useQuery({
        queryKey: ['menus'],
        queryFn: async() => {
            const res = await axiosPublic.get('/menus')
            return res.data
        },
    })


    // const [menus, setMenus] = useState([])
    // const [loading, setLoading] = useState(true)
    // useEffect( () => {
    //     fetch('http://localhost:5000/menus')
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenus(data)
    //         setLoading(false)
    //     })
    // }, [])

    return [menus, refetch]
};

export default useMenu;