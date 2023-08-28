import {Link} from 'react-router-dom'
//within braces because it's not the default export in the file.
import { useAuth } from './security/Authcontext'

export default function HeaderComponent() 
{
    //picking up context to access shared state.
    // const authContext = useContext(AuthContext)

    //using our custom hook
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }



    
    //we can use the shared value now.

    return(
    <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://monday.com/">Monday.com</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">{isAuthenticated &&<Link className="nav-link" to="/welcome/jassingh2911">Home</Link>}</li>
                            <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}</li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">{!isAuthenticated &&<Link className="nav-link" to="/login">Login</Link>}</li>
                        <li className="nav-item fs-5">{isAuthenticated &&<Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}</li>
                    </ul>
                </nav>
            </div>
        </div>
</header>
    )
}