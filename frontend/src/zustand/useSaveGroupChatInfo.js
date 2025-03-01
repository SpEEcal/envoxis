import {create} from 'zustand'

const useSaveGroupChatInfo = create((set) => ({
    Userstoaddtogroupchat: [],
    setUserstoaddtogroupchat: (selectedCreateGroupChat) => set({selectedCreateGroupChat}),
    newSelectedUser: 1,
    setNewSelectedUser: (selectedUsers) => set({selectedUsers}),
    oldSelectedUser: 0,
    setOldSelectedUser: (isSelectedUser) => set({isSelectedUser}),
}))

export default useSaveGroupChatInfo