import toast from 'react-hot-toast'

const useAddFriend = () => {
    // senderid parameter used to add to friends list
    const addFriend = async (senderid) => {
        try {
            // res captures the return from the backend
            // fetch is used to run a backend function to perform the action of adding a friend
            const res = await fetch("/api/users/addfriend", {
                method: "POST", // defines method
                // gives the server information about the request
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({senderid}) // sends string of senderid to backend
            })

            const data = await res.json() // gets return status from backend
            if (data.error){
                throw new Error(data.error) // sends error to "catch" if there is one
            }
        // displays error if found
        } catch (error) {
            toast.error(error.message)
        }
    }

    return { addFriend } // returns function to be used 
}

export default useAddFriend