
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/Signup"
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer,toast} from 'react-toastify'
import Contact from "./showingpages/Contact"
import About from "./showingpages/About"
import Main from "./showingpages/Main"
import { useEffect, useState } from "react"
import Navbar from "./component/Navbar"

function App() {
const [islogged,setislogged] =useState(false)

useEffect(()=>{
  console.log("usee");
  
const id=localStorage.getItem("token")

if(id){
  setislogged(true)
}
else{
  setislogged(false)
}
},[])
  return (
    <>
    <BrowserRouter>
   
    {/* <Routes>
          {islogged ? (
            <>
              <Route path="/" exact element={<Home />} />
              <Route path="/home" exact element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/" exact element={<Main />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<Signup />} />
            </>
          )}
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
        </Routes> */}
    <Routes>
    <Route path="/" exact element={<Home/>}/>
      <Route path="/main" exact element={<Main/>}/>
      <Route path="/about" exact element={<About/>}/>
      <Route path="/contact" exact element={<Contact/>}/>
      <Route path="/home" exact element={<Home/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/signup" exact element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  )
}

//define the root component to handle initial redirect
const Root=()=>{
  //check is token is in localstorage

  const isauth=!!localStorage.getItem("token")

  //redirect to homepage if authenticated otherwise return to login
  return isauth ? (
    <Navigate to="/home" />
):(
  <Navigate to='/login' />
);
};
export default App
