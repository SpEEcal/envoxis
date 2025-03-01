import useCreateGroupChat from '../zustand/useCreateGroupChat'

const useSelectedUsersZustand = () => {
    const {selectedUsers} = useCreateGroupChat()
  return (selectedUsers)
}

export default useSelectedUsersZustand