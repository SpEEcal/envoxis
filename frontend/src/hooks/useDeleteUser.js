import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useDeleteUser = () => {
    const {setAuthUser} = useAuthContext()

    const deleteUser = async () => {
        try {
            const res = await fetch("/api/auth/deleteuser", {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            })
            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }

            localStorage.removeItem("chat-user")
            setAuthUser(null)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return {deleteUser}
}

export default useDeleteUser