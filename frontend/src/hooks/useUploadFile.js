// library or external function to be used in program
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"

export const useUploadFile = () => {
    // gets messages and sets messages to be updated
    const {messages, setMessages, selectedConversation} = useConversation()


    const uploadfile = async (formData) => {
        try {
            // res captures the return from the backend
            // fetch is used to run a backend function to perform the action of uploading a file
            const res = await fetch(`/api/messages/uploadfile/${selectedConversation._id}`, {
                method: "POST",
                // sends the files in form data to be stored
                body: formData
            })

            // captures the output from the backend in format of string
            const data = await res.json()

            //checks for errors
            if (data.error){
                throw new Error(data.error)
            }

            // adds the new message to the messages array
            setMessages([...messages, data])
        // checks for any errors
        } catch (error) {
            toast.error(error.message)
        }
    }

    return {uploadfile}
}

export default useUploadFile