import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {login as depLoginApi} from '../utils/dependent'

export default function LogInDependentPage({ onLogIn }) {

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
            depLoginApi(input)
                .then(token => {
                    console.log(token)
                    localStorage.setItem("token", token)
                    onLogIn(input)
                }).catch(err => console.log(err))
            navigate('/profile')  
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