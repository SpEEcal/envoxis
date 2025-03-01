import toast from 'react-hot-toast'

const useAddFriend = () => {

    const addFriend = async (senderid) => {
        try {
            const res = await fetch("/api/users/addfriend", {
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

    return { addFriend }
}

export default useAddFriend