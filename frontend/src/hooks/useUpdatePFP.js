import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

export const useUpdatePFP = () => {
    const {authUser, setAuthUser} = useAuthContext()

    const updatePFP = async (formData) => {
        try {
            const res = await fetch("/api/auth/changepfp", {
                method: "POST",
                body: formData
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

    return {updatePFP}
}

export default useUpdatePFP