import toast from "react-hot-toast"

const useGetFriends = async () => {
    var friends = null
    try {
        const res = await fetch("/api/users/getfriends", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })

        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        friends = data
    } catch (error) {
        toast.error(error.message)
    }

    return {friends}
}

export default useGetFriends