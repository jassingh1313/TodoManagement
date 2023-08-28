import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/Authcontext";



export default function WelcomeComponent() {
    //accepting a param in the component.
    //deconstructing object and receiving just matching value.
   const {username} =  useParams();

   const [message, setMessage] = useState(null)

   const authContext = useAuth()


   function callHelloWorldRestApi(){
        console.log('called')
        //axios
        // axios.get('http://localhost:8080/hello-world')
        // .then( (response) => successfulResponse(response))
        // .catch((error) => errorResponse(error))
        // .finally( () => console.log('cleanup'))

        retrieveHelloWorldPathVariable('jassingh2911!', authContext.token)
        .then( (response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally( () => console.log('cleanup'))
    }

    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }
    function errorResponse(error){
        console.log(error)
    }

    return(
        <div className="WelcomeComponent">
            <h1>Welcome {username}!</h1>
            <div>
                Manage your todos - <Link to = "/todos">Go here</Link>
            </div>

            <div>
                <button className = "btn btn-success m-5" onClick = {callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}
