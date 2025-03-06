import { useState } from "react"
import useConversation from "../../zustand/useConversation"
import useGetConversations from "../../hooks/useGetConversations"
import toast from "react-hot-toast"
import './message.css';
import $ from "jquery"

const SearchInput = () => {
    const [search, setSearch] = useState("") // sets the username of user to be found
    const {setSelectedConversation} = useConversation() // sets the wanted conversation 
    const {conversations} = useGetConversations() // gets all conversations to be chosen from

    const handleSubmit = (e) => {
        e.preventDefault() // prevents refresh of window

    // for mobile users so that they can access the search bar
        $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 90vw;} .contact-container {width: 0%;} .user-desc{ width: 0%;} .message-container {width: 90vw; gap: 0px;} .contact-submit { right: 40%; } }</style>");

        if(!search) return // returns nothing if no search has happened
        if(search.length < 3){
            return toast.error('Search term must be at least 3 characters long') // usernames cannot be 3 characters long
        }

        const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase())) // finds the user and their conversation

        if(conversation){ // sets conversation in hook to be used
            setSelectedConversation(conversation)
            setSearch('')
        } else toast.error("User not found") // displays error
    }

  return (
    <form onSubmit={handleSubmit} className="contact-form"> {/* displays the search bar */}
        <input type="search" className="contact-input" placeholder="Search user..." value={search} onChange={(e) => setSearch(e.target.value)}/> {/* sets search value to find user */}
        <button className="contact-submit"><i className="bx bx-search-alt-2" /></button>
    </form>
  )
}

export default SearchInput