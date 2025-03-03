import toast from "react-hot-toast"
import { useEffect, useState } from "react"

const useGetFriends = () => {
    const [friends, setFriends] = useState([]) // var to store array of friends

    useEffect(() => {
        const getFriends = async () => {
            try {
                // res captures the return from the backend
                // fetch is used to run a backend function to perform the action of getting all of the users friends
                const res = await fetch('/api/users/getfriends')
                const data = await res.json() // gets return status from backend

                if(data.error){
                    throw new Error(data.error) // sends error to "catch" if there is one
                }

                setFriends(data)
            // displays error if found
            } catch (error) {
                toast.error(error.message)
            }
        }

        getFriends() // allows the function to call itself
    },[])

    return { friends } // returns array of friends to be used
}

export default useGetFriends