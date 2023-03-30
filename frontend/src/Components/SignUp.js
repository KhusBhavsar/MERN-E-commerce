import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const auth= localStorage.getItem("user");
    if(auth){
      navigate("/");
    }
  },[])
  const collectData = async () => {
    console.warn(name, email, password);
    try {
      let result = await fetch("http://127.0.0.1:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const response = await result.text();
      console.log(response); // log the response
      localStorage.setItem("user",JSON.stringify(result));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='in'>
      <h3>Register</h3>
      <input className='inputBox' type="text" 
      value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' />

      <input className='inputBox' type="email" 
      value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' />

      <input className='inputBox' type="password" 
      value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' />

      <button type='button' onClick={collectData}>SignUp</button>
    </div>
  )
}

export default SignUp;