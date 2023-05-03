import React, { useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    let location = useLocation();
    const context = useContext(noteContext)
    const { logOut, setLogOut, name } = context
    // useEffect(() => {
    //     console.log(location)
    // }, [location])
    return (

        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to='/about'>About</Link>
                        </li>
                    </ul>
                    {!logOut ?
                        <form className="d-flex">
                            <Link to="/login" className="btn btn-primary mx-2" role="button">Login</Link>
                            <Link to="/signup" className="btn btn-primary mx-2" role="button">Signup</Link>
                        </form> :
                        <div className="d-flex justify-content-center align-items-center" >
                            <div className="d-flex text-white h4" style={{ position: "relative", top: "0.7vh" }} >Welcome {name}</div>
                            <i className="fa-solid fa-right-from-bracket text-white mx-4  h2" style={{ position: "relative", top: "0.7vh" }} onClick={() => {
                                localStorage.removeItem("auth-token");
                                navigate('/login')
                                setLogOut(false)
                            }}></i>
                        </div>
                    }
                </div>
            </div>
        </nav>

    )
}
