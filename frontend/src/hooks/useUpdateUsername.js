import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

export const useUpdateUsername = () => {
    const {setAuthUser} = useAuthContext()

    const updateUsername = async (username) => {
        const success = handleInputErrors(username)
        if (!success) return;

        try {
            const res = await fetch("/api/auth/updateusername", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username})
            })

            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }

            await localStorage.setItem("chat-user", JSON.stringify(data))
            await setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return {updateUsername}
}

export default useUpdateUsername

function handleInputErrors(username){
    if (!username){
        toast.error("Enter a username")
    }

    return true
}