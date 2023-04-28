import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login as ownerApiLogin } from "../utils/owner"

export default function LogInBusinessPage({ onLogInOwn }) {

    const [input, setInput] = useState({})
    // const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ target }) => {
        setInput({ ...input, [ target.name ] : target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(input)
        if (input.email && input.password){
            ownerApiLogin(input)
                .then(token => {
                    console.log(token)
                    localStorage.setItem("token", token)
                    onLogInOwn(input)
                }).catch(err => console.log(err))
            navigate('/owner')  
        } 
        // else {
            
            //  <AlertMessage onError={setError}>
        // }
    }

    return (
        <div>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="yourbusiness@email.com" />
                <input type="password" name="password" />
                <button>Submit</button>
            </form>
        </div>
    )
}