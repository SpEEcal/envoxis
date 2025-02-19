import toast from 'react-hot-toast'

const useRequestSent = () => {
    const RequestSent = async (username) => {
        try {
            // gets all data frm backend to send a request to a user
            const res = await fetch("/api/users/sendrequest", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username})
            })

            // gets return value from backend
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            console.log("Request sent successfully!!!")

        } catch (error) {
            toast.error(error.message)
        }
    }

    return {RequestSent}
}

export default useRequestSent