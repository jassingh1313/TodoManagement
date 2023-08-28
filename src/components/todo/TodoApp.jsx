import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import TodoComponent from './TodoComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './security/Authcontext'
import './TodoApp.css'

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children

    //if not authenticated
    return <Navigate to ="/" />

}

export default function TodoApp(){

    return (
        <div className="TodoApp">

            {/* Component selected based on route */}
            <AuthProvider>
                <BrowserRouter>

                    <HeaderComponent />

                    <Routes>
                        <Route path="/" element={<LoginComponent />} />

                        <Route path="/login" element={<LoginComponent />} />

                        <Route path="/welcome/:username" element={<AuthenticatedRoute>
                            <WelcomeComponent />
                        </AuthenticatedRoute>} />

                        <Route path="/todos" element={<AuthenticatedRoute>
                            <ListTodosComponent/>
                        </AuthenticatedRoute>} />

                        <Route path="/todo/:id" element={<AuthenticatedRoute>
                            <TodoComponent/>
                        </AuthenticatedRoute>} />



                        <Route path="/logout" element={<AuthenticatedRoute>
                            <LogoutComponent/>
                        </AuthenticatedRoute>} />

                        <Route path="*" element={<ErrorComponent />} />

                    </Routes>

                </BrowserRouter>
            </AuthProvider>



        </div>
    )
}

 




