import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {signup as signApiDep } from '../utils/dependent'
import {login as loginApiDep } from '../utils/dependent'

export default function SignUpDependentPage () {

    const [input, setInput] = useState({})
    const navigate = useNavigate()
    const handleChange = ({target}) => {
        setInput({...input, [target.name] : target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            if (input.email && input.password && input.name){
                const newDependent = await signApiDep(input)
                    .then(dbRes => dbRes)
                
                await loginApiDep({ email : newDependent.email, password: input.password}).then(token => {
                    console.log(token)
                    localStorage.setItem("token", token)
             
                })
                navigate('/profile')  
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name"/>
                <input type="text" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button>Sign up</button>
            </form>
        </div>
    )
}