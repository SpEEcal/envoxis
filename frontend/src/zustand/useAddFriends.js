import {create} from 'zustand'

const useAddFriends = create((set) => ({
    selectedAddFriends: null,
    setSelectedAddFriends: (selectedAddFriends) => set({selectedAddFriends}),
}))

export default useAddFriends