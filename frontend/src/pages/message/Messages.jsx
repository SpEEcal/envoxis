import { useEffect, useRef } from "react"
import useGetMessages from "../../hooks/useGetMessages"
import useListenMessages from "../../hooks/useListenMessages"
import SentMessage from "./SentMessage"
import SentImage from "./SentImage"
import SentFile from "./SentFile"
import moment from 'moment';
import './message.css';

const Messages = () => {
  moment.locale("en-gb")
  const {messages, loading} = useGetMessages()
  console.log(messages)
  const lastMessageRef = useRef()
  // checks the type of message
  let isImage = null
  let isText = null
  let isFile = null
  // checks the last date of a message
  let lastDate = null

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behaviour: "smooth"}) // makes the scrolling to see past messages smooth 
    },0)
  },[messages])

  useListenMessages() // checks for new messages

  // function to find out when a message was sent - sets the divider to when a message was sent
  const Current_Time = (message) => {
    const current_date = moment().format("DD:MM:YYYY")
    const current_year = moment().format("YYYY")
    const messageDate = moment(message.createdAt).format("DD:MM:YYYY")
    const messageYear = moment(message.createdAt).format("YYYY")
    const messagediff = moment().diff(moment(message.createdAt), 'days')

    const showYear = messageYear === current_year // checks if the year the message was sent was this year
    const today = current_date === messageDate // checks whether the message was sent today
    const showDate = lastDate !== messageDate // checks whether the last date is not the messageDate

    lastDate = messageDate // sets the last date as the message date

    if (today){  // checks if message was sent today
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            Today
          </div>}
        </div>
      )
    }
    else if (messagediff < 2 && showYear){ // checks if message was sent yesterday
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            Yesterday
          </div>}
        </div>
      )
    }
    else if (messagediff < 7 && showYear){ // checks if message was sent this week
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            {moment(message.createdAt).format("dddd")}
          </div>}
        </div>
      )
    }
    else if (messagediff > 7 && showYear){ // checks if message was sent after a week
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            {moment(message.createdAt).format("Do MMMM")}
          </div>}
        </div>
      )
    }
    else { // checks if message was sent in last years
      return(
        <div>
          {showDate && <div className="divider divider-slate-300 ">
            {moment(message.createdAt).format("Do MMMM YYYY")}
          </div>}
        </div>
      )
    }
  }

  const isTextF = (message) => { // checks if message is a file
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
          {Current_Time(message)} {/* sets divider of the date of the message sent */}
          {isText = isTextF(message)} {/* checks if message is a file */}
          {isText ? <SentMessage key={message._id} message={message} />: ""} {/* if not file then it is sent as a regular message */}
          {isImage = message.filetype === "image"} {/* checks if message is an image */}
          {isFile = message.filetype === "document"} {/* checks if message is a file */}
          {isImage ? (<SentImage key={message._id} message={message} />): ""} {/* sends message as an image */}
          {isFile ? (<SentFile key={message._id} message={message} />): ""} {/* sends message as a file */}
        </div>
      ))}

      {!loading && messages.length === 0 && ( // if there are no messages at all
        <p className="start-text"><i className="bx bx-down-arrow-alt"></i>Send a message to start a conversation <i className="bx bx-down-arrow-alt"></i></p>
      )}
    </div>
  )
}

export default Messages