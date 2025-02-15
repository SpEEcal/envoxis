
const useGetChangeColor = () => {
    const webpage = window.location.href
    const Change1 = webpage === 'http://localhost:3000/home'
    const Change2 = webpage === 'http://localhost:3000/message'
    const Change3 = webpage === 'http://localhost:3000/events'
    const Change4 = webpage === 'http://localhost:3000/settings'


    return {Change1, Change2, Change3, Change4}
}

export default useGetChangeColor