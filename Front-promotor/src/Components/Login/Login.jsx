import React, { useState } from 'react'
import { usaState } from "react";
import "./Login.css"

const Login = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");



    const HandleSubmit = (event) => {
        event.preventDefault();

        console.log("teste", username, password);

        console.log("Envio") 

        alert("enviando os dados :" +  username +    " - "  +  password);
    };

  return (
    <div className="container">

        <form onSubmit={HandleSubmit}>
            <h1>Login do promotor</h1>

            <div className='input-field'>
                <input type="text" placeholder='Usuário'onChange={ (e) => setUsername(e.target.value)}/>
            </div>
        
            <div className='input-field'>
                <input type="Password" placeholder='Senha'onChange={ (e) => setUsername(e.target.value)}/>    
            </div>


            <div className="racall-forget">

                <label htmlFor=''>
                 <input type = "checkbox"/>
                lembre de mim 
                <a href='#'>Esqueceu a Senha?</a>
                </label>

            </div>

            <button>Entrar</button>


        </form>
      
    </div>
  )
}

export default Login