import { useEffect, useRef } from "react"
import useGetMessages from "../../hooks/useGetMessages"
import useListenMessages from "../../hooks/useListenMessages"
import SentMessage from "./SentMessage"
import SentImage from "./SentImage"
import SentFile from "./SentFile"
import moment from 'moment';
import './message.css';
import { useAuthContext } from "../../context/AuthContext"

const Messages = () => {
  moment.locale("en-gb")
  const {messages, loading} = useGetMessages()
  const lastMessageRef = useRef()
  const {authUser} = useAuthContext()
  let isImage = null
  let isText = null
  let isFile = null
  let lastDate = null

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behaviour: "smooth"})
    },0)
  },[messages])

  if (authUser.status != "../Messageimg/dnd.png"){
    useListenMessages()
  }

  const Current_Time = (message) => {
    const current_date = moment().format("DD:MM:YYYY")
    const current_year = moment().format("YYYY")
    const messageDate = moment(message.createdAt).format("DD:MM:YYYY")
    const messageYear = moment(message.createdAt).format("YYYY")
    const messagediff = moment().diff(moment(message.createdAt), 'days')

    const showYear = messageYear === current_year
    const today = current_date === messageDate
    const showDate = lastDate !== messageDate

    lastDate = messageDate

    if (today){
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            Today
          </div>}
        </div>
      )
    }
    else if (messagediff < 2 && showYear){
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            Yesterday
          </div>}
        </div>
      )
    }
    else if (messagediff < 7 && showYear){
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            {moment(message.createdAt).format("dddd")}
          </div>}
        </div>
      )
    }
    else if (messagediff > 7 && showYear){
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            {moment(message.createdAt).format("Do MMMM")}
          </div>}
        </div>
      )
    }
    else {
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            {moment(message.createdAt).format("Do MMMM YYYY")}
          </div>}
        </div>
      )
    }
  }

  const isTextF = (message) => {
    if (message.filetype == undefined){
      return true
    }
    else{
      return false
    }

  }

  return (
    <div className="convo-container">
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          {Current_Time(message)}
          {isText = isTextF(message)}
          {isText ? <SentMessage key={message._id} message={message} />: ""}
          {isImage = message.filetype === "image"}
          {isFile = message.filetype === "document"}
          {isImage ? (<SentImage key={message._id} message={message} />): ""}
          {isFile ? (<SentFile key={message._id} message={message} />): ""}
        </div>
      ))}

      {!loading && messages.length === 0 && (
        <p className="start-text"><i className="bx bx-down-arrow-alt"></i>Send a message to start a conversation <i className="bx bx-down-arrow-alt"></i></p>
      )}
    </div>
  )
}

export default Messages