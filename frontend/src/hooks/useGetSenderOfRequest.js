import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetSenderOfRequest = (senderid) => {
    const [senderinfo, setSenderInfo] = useState([])

    useEffect(() => {
        const senderinfofinding = async (senderid) => {
            try {
                const res = await fetch(`/api/users/senderinfo`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({senderid})
                })
        
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                setSenderInfo(data)
            } catch (error) {
                toast.error(error.message)
            }
        }

        senderinfofinding(senderid) // allows the function to call itself
    },[])
    return { senderinfo }
}

export default useGetSenderOfRequest