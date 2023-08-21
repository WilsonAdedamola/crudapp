import React, { useEffect, useState } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import fireDb from "../firebase";
import "./View.css";

const View = () => {

  const [user, setUser] = useState({})

  const {id} = useParams()

useEffect(()=> {
  fireDb.child(`contacts/${id}`).get().then((snapshot) =>{
    if(snapshot.exists()){
      setUser({...snapshot.val()})
    }else{
      setUser({})
    }
  })
}, [id])

console.log(user)

  return (
    <div style={{marginTop: "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>User ID: {id}</p>
        </div>
        <div className="container">
          {/* <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br /> */}
          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Phone: </strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className="back">Go back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View
