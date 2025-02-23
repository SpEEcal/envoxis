
const useRemoveFriend = async (friendid) => {
    try {
        const res = await fetch("/api/users/deletefriend", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({friendid})
        })

        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }

    } catch (error) {
        toast.error(error.message)
    }
}

export default useRemoveFriend