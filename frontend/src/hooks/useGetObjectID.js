import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetObjectID = (userString) => {
    const [userid, setUserID] = useState(null)

    useEffect(() => {
        const senderinfofinding = async (userString) => {
            try {
                const res = await fetch(`/api/users/objectID`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userString})
                })
        
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                setUserID(data)
            console.log(userid)
            } catch (error) {
                toast.error(error.message)
            }
        }

        senderinfofinding(userString) // allows the function to call itself
    },[])
    return { userid }
}

export default useGetObjectID