import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useChangeStatus = () => {
    const {setAuthUser} = useAuthContext()

    const newstatus = async (status) => {
        try {
            const res = await fetch("/api/auth/changestatus", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({status})
            })

            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return {newstatus}
}

export default useChangeStatus