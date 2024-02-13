import React, { useState } from 'react';
import InputTextBox from '../InputTextbox';
import { useNavigate } from 'react-router-dom';
import { error } from 'console';

const Login = (props:any):any =>{
const [userName,setUserName]=useState('')
const [email,setEmail]=useState('')
const navigate = useNavigate() 
const handleChange=(name:string,val:string)=>{
    if(name=='userName'){
          setUserName(val)
    }
    else{
    setEmail(val)
    }
    }
    async function handleLogin() {
    try{
        const response = await fetch('http://localhost:8000/users/login/', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : userName,
                password : email
            }), 
          });
        if(response.ok){
            console.log(response)  
            const responseJson = await response.json()
            console.log(responseJson)
            localStorage.setItem('token',responseJson.token)
            navigate('/dashboard')
        } else{
            throw new Error(response.statusText)
        }
       
    }    
    catch(err){
        //navigate('/dashboard')
        alert(err)
     }   
        
    }

    return(
    <>
        <div className='login_form_header'>
            <div>
            <img className='brand_logo' alt='kaizntree_logo' src='https://static.wixstatic.com/media/29e8d0_8b0f74ea83984e15beecd6ec7e2d6531~mv2.webp'/>
            </div>
            <div className='brand_name'>
                <p>Kaizntree</p>
            </div>
            
        </div>
        <div className='login_form'>
            <InputTextBox change = {handleChange} placeholder="Username" name="userName" type="text"/>
            <InputTextBox change = {handleChange} placeholder="Password" name="passWord" type="password"/>
            <div className='login_form_actions'>
                <button>CREATE ACCOUNT</button>
                <button onClick={handleLogin}>LOG IN</button>
            </div>
            <div className='forgot_password'>
                <a href='/'>Forgot Password</a>
            </div>
        </div>
        
    </>
    )
}

export default Login;

