//Create a context:

import { createContext, useContext } from "react";
import { useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";

//We want to provide access of the Authcontext to multiple children components. Export it and import in the component where we need it.
export const AuthContext = createContext()

//hook is a function 
//This arrow function serves as the implementation of the custom hook. It uses the useContext hook to access the value provided by the AuthContext. useContext is a React hook that allows components to consume values from a context.


export const useAuth = () => useContext(AuthContext)



//Put some state in the context.

//share the created context with other components. 

//all children of Authprovider in TodoApp.jsx will be assigned to children variable.

//Authprovider provides the context(shared state to all the children component of Authprovider

//create context variable

//make an context provider function and add the provider JSX tag in the apt file to get the children elements. 

//create a shared state in the provider function and pass it down to the children components.

//export the context and import in the desired component to access the shared state. 

export default function 
AuthProvider({children}) {
    //put some state in the context.


    const[isAuthenticated, setAuthenticated] = useState(false)

    const[username, setUsername] = useState(null)

    const[token, setToken] = useState(null)


    // function login(username, password){
    //     if(username === 'jassingh2911' && password === 'dummy')
    //     {
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
            
    //     }
    //     else
    //     {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false

    //     }
    // }


   async function login(username, password){

        const baToken = 'Basic ' + window.btoa(username + ":" + password)

        try{

            const response = await executeBasicAuthenticationService(baToken)


            
            if(response.status == 200)
            {
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )
                return true
                
            }
            else
            {
                logout()
                return false

            }

        } catch(error){
            logout()
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        //sending an object through the context 
        <AuthContext.Provider value = {{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>

    )
}


