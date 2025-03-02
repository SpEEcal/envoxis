import toast from "react-hot-toast"

const useDeleteRequest = async (senderid) => {
    // senderid parameter used to add to friends list
    try {
        // res captures the return from the backend
        // fetch is used to run a backend function to perform the action of deleting a request
        const res = await fetch("/api/users/deleterequest", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({senderid})
        })

        const data = await res.json() // gets return status from backend
        if (data.error){
            throw new Error(data.error) // sends error to "catch" if there is one
        }
    // displays error if found
    } catch (error) {
        toast.error(error.message)
    }
}

export default useDeleteRequest // exports function to be used 