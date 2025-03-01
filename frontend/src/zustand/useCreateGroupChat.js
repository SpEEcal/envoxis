import {create} from 'zustand'

const useCreateGroupChat = create((set) => ({
    selectedCreateGroupChat: null,
    setSelectedCreateGroupChat: (selectedCreateGroupChat) => set({selectedCreateGroupChat}),
    selectedUsers:[],
    setSelectedUsers: (selectedUsers) => set({selectedUsers}),
    isSelectedUser: 0,
    setIsSelectedUser: (isSelectedUser) => set({isSelectedUser}),
    oldSelectedUser: 0,
    setoldSelectedUser: (oldSelectedUser) => set({oldSelectedUser}),

}))

export default useCreateGroupChat