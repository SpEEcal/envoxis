import toast from "react-hot-toast"

const useGetRequests = () => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        const getRequests = async () => {
            try {
                const res = await fetch('/api/users/getrequests')
                const data = await res.json()

                if(data.error){
                    throw new Error(data.error)
                }

                setRequests(data)
            } catch (error) {
                toast.error(error.message)
            }
        }

        getRequests()
    },[])

    return { requests }
}

export default useGetRequests