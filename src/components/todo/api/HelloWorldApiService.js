import { apiClient } from "./ApiClient";

export function retrieveHelloWorldBean(){
    return apiClient.get('/hello-world-bean')
}


export const retrieveHelloWorldPathVariable = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`
// , {
//     headers: {
//         Authorization: token
//     }
// }
)


export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`, {
    headers: {
        Authorization: token
    }
})
// export const retrieveHelloWorldPathVariable = (username) => axios.get(`http://localhost:8080/hello-world/path-variable/${username}`)