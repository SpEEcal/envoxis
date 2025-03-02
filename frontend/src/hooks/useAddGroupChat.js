import { useState } from 'react'
import toast from 'react-hot-toast'

const useAddGroupChat = () => {

    const addGroupChat = async (creatorid, listOfUsers) => {
        let listofuserids = []
        listofuserids.push(creatorid)
        listOfUsers.map((user) => {
            listofuserids.push(user._id)
        })
        while (listofuserids.length < 10){
            listofuserids.push(null)
        }
        try {
            const res = await fetch("/api/users/creategroupchat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({listofuserids})
            })

            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }

            console.log(data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return { addGroupChat }
}

export default useAddGroupChat