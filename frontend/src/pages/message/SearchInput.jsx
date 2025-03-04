import { useState } from "react"
import useConversation from "../../zustand/useConversation"
import useGetConversations from "../../hooks/useGetConversations"
import toast from "react-hot-toast"
import './message.css';
import $ from "jquery"

const SearchInput = () => {
    const [search, setSearch] = useState("")
    const {setSelectedConversation} = useConversation()
    const {conversations} = useGetConversations()

    const handleSubmit = (e) => {
        e.preventDefault()

        $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 90vw;} .contact-container {width: 0%;} .user-desc{ width: 0%;} .message-container {width: 90vw; gap: 0px;} .contact-submit { right: 40%; } }</style>");

        if(!search) return
        if(search.length < 3){
            return toast.error('Search term must be at least 3 characters long')
        }

        const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()))

        if(conversation){
            setSelectedConversation(conversation)
            setSearch('')
        } else toast.error("User not found")
    }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
        <input type="search" className="contact-input" placeholder="Search user..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className="contact-submit"><i className="bx bx-search-alt-2" /></button>
    </form>
  )
}

export default SearchInput