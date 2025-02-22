import toast from "react-hot-toast"
import { useEffect, useState } from "react"

const useGetFriends = () => {
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await fetch('/api/users/getfriends')
                const data = await res.json()

                if(data.error){
                    throw new Error(data.error)
                }

                setFriends(data)
            } catch (error) {
                toast.error(error.message)
            }
        }

        getFriends()
    },[])

    return { friends }
}

export default useGetFriends