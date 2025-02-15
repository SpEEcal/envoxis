import Status from "./Status"
import useGetConversations from "../../hooks/useGetConversations"

const Statuses = () => {
    const {loading, conversations} = useGetConversations()
  return (
    <div>
        {conversations.map((conversation) => (
            <Status
                key={conversation._id}
                conversation={conversation}
            />
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Statuses