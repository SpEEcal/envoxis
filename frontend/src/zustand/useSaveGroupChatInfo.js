import {create} from 'zustand'

const useSaveGroupChatInfo = create((set) => ({
    Userstoaddtogroupchat: [],
    setUserstoaddtogroupchat: (selectedCreateGroupChat) => set({selectedCreateGroupChat}),
}))

export default useSaveGroupChatInfo