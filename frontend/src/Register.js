import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
export default function Register(){
const Navigate = useNavigate();
    const [details,changeDetails] = useState({
        name:"",
        email:"",
        pwd:""
    })
    console.log(details);
    function handleClick(e){
        e.preventDefault();
        const name = document.getElementsByClassName("name")[0].lastElementChild.value;
        const pwd = document.getElementsByClassName("pwd")[0].lastElementChild.value;
        const email = document.getElementsByClassName("email")[0].lastElementChild.value;
        console.log(name,pwd);
        const json_details = {
            name : name,
            email:email,
            pwd : pwd
        }

         const registeredUser =  async function(){
            await fetch('http://localhost:6969/def/',{
            method: 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(json_details)
        });
        } 

        alert('User is registered');
        Navigate('/login');
    }
    return (
        <div className="register__container">
            <form>
                <div className="name">
                <label htmlFor="name">Enter Your Name</label>
                <input type="text" name="name" onChange={(e)=>{
                    changeDetails((prev)=>{
                        return {...prev,name:e.target.value}
                    })
                }}></input>
                </div>

                <div className="email">
                <label htmlFor="email">Enter Your Email</label>
                <input type="text" name="email" onChange={(e)=>{
                    changeDetails((prev)=>{
                        return {...prev,email:e.target.value}
                    })
                }}></input>
                </div>
                
                <div className="pwd">
                <label htmlFor="password">Enter Your Password</label>
                <input type="text" name="password" onChange={(e)=>{
                    changeDetails((prev)=>{
                        return {...prev,pwd:e.target.value};
                    })
                }}></input>
                
                </div>
                <button type="submit" onClick={handleClick}>Register</button>
            </form>
        </div>
    )
}