import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {signup as signApiOwner } from '../utils/owner'
import {login as loginApiOwner } from '../utils/owner'

export default function SignUpBusinessPage () {

    const [input, setInput] = useState({})
    const navigate = useNavigate()
    const handleChange = ({target}) => {
        setInput({...input, [target.name] : target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            if (input.email && input.password && input.name){
                const newOwner = await signApiOwner(input)
                    .then(dbRes => dbRes)
                
                await loginApiOwner({ email : newOwner.owner_email, password: input.password}).then(token => {
                    console.log(token)
                    localStorage.setItem("token", token)
                    // onLogInOwn(input)
                })
                navigate('/owner/profile')  
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Business Name"/>
                <input type="text" name="email" placeholder="Business Email"/>
                <input type="password" name="password" placeholder="password"/>
                <button>Sign up</button>
            </form>
        </div>
    )
}