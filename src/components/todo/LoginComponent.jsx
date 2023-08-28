import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/Authcontext'

export default function LoginComponent() {
//user name, password, button
    //creating some state to hold username default value is js2911
    //returns an array of 2 elements
    //the state var and method to update
    const authContext = useAuth()

    const [username, setUsername] = useState('jassingh2911')

    const [password, setPassword] = useState('')


    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate();


    async function handleSubmit(){
        if(await authContext.login(username, password))
        {
            navigate(`/welcome/${username}`)
            
        }
        else
        {
            setShowErrorMessage(true)

        }
    }



    //Whenever you type in the input field, the onChange event is triggered, which calls the handleUsernameChange function. Inside the function, the setUsername function is used to update the username state variable with the new value of the input field (event.target.value).

    //in summary, as you type in the input field, the value we enter/change in the input field (event.target.value) is captured, stored in the username state variable, and then reflected back in the value attribute of the input field, resulting in a real-time update of the displayed value.

    //as we type we are changing the target value.
    function handleUsernameChange(event){
        setUsername(event.target.value)
        
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
        
    }


    return(
        <div className="Login">
            <h1>Please Login</h1>

            {showErrorMessage && <div className='errorMessage'>Authentication Failed. Please check your credentials.</div>}


            <div className="LoginForm">

                <div>

                    <label>User Name</label>
                    {/* tagging form element with state variable */}
                    <input type="text" name="username" value={username} onChange = {handleUsernameChange} />

                </div>

                <div>

                    <label>Password</label>
                    <input type="password" name="password" value = {password} onChange = {handlePasswordChange} />

                </div>

                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>

            </div>

        </div>
    )
}

