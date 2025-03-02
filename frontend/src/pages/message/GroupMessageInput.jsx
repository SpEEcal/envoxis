// library or external function to be used in program
import { useState } from "react"
import useUploadFile from "../../hooks/useUploadFile"
import useSendGroupMessage from "../../hooks/useSendGroupMessage"

const GroupMessageInput = () => {
    const [message, setMessage] = useState("")
    const {sendGroupMessage} = useSendGroupMessage()
    // function from hook to upload file
    const {uploadfile} = useUploadFile()
    const [file, setFile] = useState("")

    const handleSubmit = async (e) => {
      // prevents website from refreshing
        e.preventDefault()
      // checks if the message is a file
        if (file) {
          const formData = new FormData() // sets array
          formData.append("file", file) // adds file to array
          await uploadfile(formData) // used as parameter in hook function
          setFile("") // sets file back to an empty string
        }
      // checks if a message exists
        if(!message) return;
        await sendGroupMessage(message)
        setMessage("")
    }

    const onInputChange=(e)=>{
      console.log(e.target.files[0])
      setFile(e.target.files[0])
    }
  return (
    <div className="input-container" onSubmit={handleSubmit}>
        <form className="convo-form">
            <input type="text" id="convo-input" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <label for="file-upload" class="custom-file-upload"><i className="bx bx-paperclip" /></label>
            <input type="file" name="file" id="file-upload" onChange={onInputChange}/> {/* gets file from user to be sent to other user */}
            <button type="submit" className="convo-submit"><i className="bx bx-send"/></button> { /* submits the message / file to be sent */}
            <button className="convo-emoji"></button>
        </form>
    </div>
  )
}

export default GroupMessageInput