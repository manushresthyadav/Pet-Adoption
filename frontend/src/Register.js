import { useState } from "react";
import "./register.css";

export default function Register(){

    const [details,changeDetails] = useState({
        name:"",
        pwd:""
    })
    console.log(details);
    function handleClick(e){
        e.preventDefault();
        const name = document.getElementsByClassName("name")[0].lastElementChild.value;
        const pwd = document.getElementsByClassName("pwd")[0].lastElementChild.value;
        console.log(name,pwd);
        const json_details = {
            name : name,
            pwd : pwd
        }

        fetch('http://localhost:6969/def/',{
            method: 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(json_details)
        })
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