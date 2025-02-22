import toast from "react-hot-toast"

const useGetFriends = () => {
    const getFriend = async () => {
        try {
            const res = await fetch("/api/users/getfriends", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })

            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }

            
        } catch (error) {
            toast.error(error.message)
        }
    }

    return { getFriend }
}

export default useGetFriends