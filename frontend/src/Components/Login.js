import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/");
        }
    },[])
    const handleLogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-type": "application/json",
            },
        })
        result= await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/");
        }else{
            alert("Enter valid details");
        }
    }
    return (
        <div>
            <div className='in'>
                <h3>Login</h3>

                <input className='inputBox' type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />

                <input className='inputBox' type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />

                <button type='button' onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login
