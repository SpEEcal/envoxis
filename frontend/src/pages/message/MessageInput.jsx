import { useState } from "react"
import useSendMessage from "../../hooks/useSendMessage"
import useUploadFile from "../../hooks/useUploadFile"
import { useAuthContext } from "../../context/AuthContext"
import EmojiPicker from 'emoji-picker-react';

const MessageInput = () => {
    const {authUser} = useAuthContext()
    const [message, setMessage] = useState("")
    const {loading, sendMessage} = useSendMessage()
    const {uploadfile} = useUploadFile()
    const [file, setFile] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (file) {
          const formData = new FormData()
          formData.append("file", file)
          await uploadfile(formData)
          setFile("")
        }
        if(!message) return;
        await sendMessage(message)
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
            <input type="file" name="file" id="file-upload" onChange={onInputChange}/>
            <button type="submit" className="convo-submit"><i className="bx bx-send" /></button>
            <button className="convo-emoji"><i className="bx bx-paperclip" /></button>
        </form>
    </div>
  )
}

export default MessageInput