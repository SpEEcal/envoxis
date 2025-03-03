
const useRemoveFriend = async (friendid) => {
    try {
        // res captures the return from the backend
        // fetch is used to run a backend function to perform the action of removing a friend
        const res = await fetch("/api/users/deletefriend", {
            method: "POST", // defines method of route
            // gives the server information about the request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({friendid}) // gives information to be used in backend
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

export default useRemoveFriend