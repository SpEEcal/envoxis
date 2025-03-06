import {create} from 'zustand'

const useConversation = create((set) => ({
    selectedConversation: null, // holds the current conversation selected
    setSelectedConversation: (selectedConversation) => set({selectedConversation}), // sets selectedConversation to the conversation needed
    messages:[], // holds the current messages in conversation
    setMessages: (messages) => set({messages}), // sets the messages to the needed messages
    files:[], // holds the current files in conversation
    setFiles: (files) => set({files}), // sets the files to the needed
    groupmessages:[], // holds the current files in conversation
    setGroupMessages: (groupmessages) => set({groupmessages}), // sets the files to the needed
})) 

export default useConversation