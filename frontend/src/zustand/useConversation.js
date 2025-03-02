import {create} from 'zustand'

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages: (messages) => set({messages}),
    files:[],
    setFiles: (files) => set({files}),
    groupmessages:[],
    setGroupMessages: (groupmessages) => set({groupmessages}),
    groupfiles:[],
    setFiles: (groupfiles) => set({groupfiles}),
}))

export default useConversation