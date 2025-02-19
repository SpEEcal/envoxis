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
  const lastMessageRef = useRef()
  let isImage = null
  let isText = null
  let isFile = null
  let lastDate = null

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behaviour: "smooth"})
    },0)
  },[messages])

  useListenMessages()

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
  
  // const FileFirst = (messagetime, filetime) => {
  //   const MessageDiffer = moment(messagetime).diff(filetime, 'milliseconds')
  //   if (MessageDiffer < 0){
  //     return false
  //   }
  //   else{
  //     return true
  //   }
  // }

  // const FirstMessage = (i, j) => {
  //   if (messages.length < i){
  //     let Nfile = files[i]
  //     return Nfile
  //   }
  //   else if (files.length < i){
  //     let Nmessage = messages[i]
  //     return Nmessage
  //   }
  //   let Nmessage = messages[i]
  //   let Nfile = files[i]
  //   let isBeforeText = FileFirst(Nmessage.createdAt, Nfile.createdAt)
  //   return isBeforeText
  // }
  
  // return (
  //   <div className="convo-container">
  //     {!loading && messages.length === 0 && files.length === 0 && (
  //       <p className="start-text"><i className="bx bx-down-arrow-alt"></i>Send a message to start a conversation <i className="bx bx-down-arrow-alt"></i></p>
  //     )}

  //     {messages.length == 0 && files.length > 0 && files.map((file) => (
  //       <div key={file._id} ref={lastMessageRef}>
  //         {isImage = file.filetype === "image"}
  //         {Current_Time(file)}
  //         {isImage ? (<SentImage key={file._id} message={file} />): (<SentFile key={file._id} message={file} />)}
  //       </div>
  //     ))}

  //     {messages.length > 0 && files.length == 0 && messages.map((message)=> (
  //       <div key={message._id} ref={lastMessageRef}>
  //         {Current_Time(message)}
  //         <SentMessage key={message._id} message={message} />
  //       </div>
  //     ))}

  //     {messagelength > 0 && (
  //       <div>
  //         {FirstMessage(i)}
  //         {j = i}
  //       </div>
  //     )}
  //   </div>
  // )

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

  // return (
  //   <div className="convo-container">
  //     {!loading && messages.length > -1 && messages.map((message) => (
  //       <div key={message._id} ref={lastMessageRef}>
  //         {}
  //         {!loading && files.length > 0 && files.map((file) => (
  //           <div key={file._id} ref={lastMessageRef}>
  //             {isBeforeText = MessageDiff(message.createdAt, file.createdAt)}
  //             {console.log(`isBeforeText: ${isBeforeText}`)}
  //             {isImage = file.filetype === "image"}
  //             {Current_Time(file)}
  //             {isBeforeText && isImage ? (<SentImage key={file._id} message={file} />): ""}
  //             {isBeforeText && !isImage ? (<SentFile key={file._id} message={file} />): ""}
  //           </div>
  //         ))}
  //         {Current_Time(message)}
  //         {<SentMessage key={message._id} message={message} />}
  //       </div>
  //     ))}

  //     {!loading && messages.length === 0 && files.length === 0 && (
  //       <p className="start-text"><i className="bx bx-down-arrow-alt"></i>Send a message to start a conversation <i className="bx bx-down-arrow-alt"></i></p>
  //     )}
  //   </div>
  // )
}

export default Messages