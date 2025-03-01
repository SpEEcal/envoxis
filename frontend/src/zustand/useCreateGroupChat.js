import {create} from 'zustand'

const useCreateGroupChat = create((set) => ({
    selectedCreateGroupChat: null,
    setSelectedCreateGroupChat: (selectedCreateGroupChat) => set({selectedCreateGroupChat}),
    selectedUsers:[],
    setSelectedUsers: (selectedUsers) => set({selectedUsers}),
    isSelectedUser: 0,
    setIsSelectedUser: (isSelectedUser) => set({isSelectedUser}),
}))

export default useCreateGroupChat