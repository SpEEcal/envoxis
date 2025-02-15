import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

export const useUpdateEmail = () => {
    const {setAuthUser} = useAuthContext()

    const updateEmail = async (email) => {
        const success = handleInputErrors(email)
        if (!success) return;

        try {
            const res = await fetch("/api/auth/updateemail", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email})
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

    return {updateEmail}
}

export default useUpdateEmail

function handleInputErrors(email){
    if (!email){
        toast.error("Enter email address")
    }

    return true
}