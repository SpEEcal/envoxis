import {create} from 'zustand'

const useUpdateProfile = create((set) => ({
    selectedUpdateProfile: null,
    setSelectedUpdateProfile: (selectedUpdateProfile) => set({selectedUpdateProfile}),
}))

export default useUpdateProfile