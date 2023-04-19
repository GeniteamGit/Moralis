import React from 'react'
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export default function Navbar() {
  const { user, logout } = useMoralis();
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="#">Home</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"/>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <button className="btn btn-danger my-2" onClick={logout}>
        Logout
      </button>
    </div>
  </div>
</nav>
    </div>
    </>
  )
}
