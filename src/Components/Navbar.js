import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../MyCss/Navbar.css'

const Navbar = () => {
    const Navigate = useNavigate()
    const handlerLogout = () =>{
        Navigate("/")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="#" >Chat-Box</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active  text-white" aria-current="page" to="#">Home</Link>
                            <Link className="nav-link  text-white" to="#">Groups</Link>
                            <Link className="nav-link  text-white" to="#">Profile</Link>
                        </div>
                    </div>
                    <button className='logout-btn' type='button' onClick={handlerLogout}>LogOut</button>
                </div>
            </nav>        
        </>
    )
}

export default Navbar


