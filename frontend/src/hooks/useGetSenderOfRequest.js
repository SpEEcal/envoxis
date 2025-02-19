const useGetSenderOfRequest = async (senderid) => {
    try {
        const res = await fetch(`/api/users/senderinfo}`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({senderid})
        })

        const data = await res.json()
        if(data.error) throw new Error(data.error)
        return data  
    } catch (error) {
        toast.error(error.message)
    }
}

export default useGetSenderOfRequest