import toast from "react-hot-toast"

const useDeleteRequest = async (senderid) => {
    try {
        const res = await fetch("/api/users/deleterequest", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({senderid})
        })

        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }

    } catch (error) {
        toast.error(error.message)
    }
}

export default useDeleteRequest