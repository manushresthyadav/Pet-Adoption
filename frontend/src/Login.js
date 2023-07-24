import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function useLogin (){

    

const Navigate = useNavigate();
    const [details,changeDetails] = useState({
        name:"",
        email:"",
        pwd:""
    })
    console.log(details);
    function handleClick(e){
        e.preventDefault();
        const name = document.getElementsByClassName("login__name")[0].lastElementChild.value;
        const pwd = document.getElementsByClassName("login__pwd")[0].lastElementChild.value;
        const email = document.getElementsByClassName("login__email")[0].lastElementChild.value;
        console.log(name,pwd);
        const json_details = {
            name : name,
            email:email,
            pwd : pwd
        }

        const loggedInUser = async function(){
            const data = await fetch('http://localhost:6969/def/login',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body : JSON.stringify(json_details)
            });
            if(data.status===200){
                alert('User is logged In');
            Navigate('/ui');
            }else{
                console.log('there was some error while loggin in',data)
            }
            
        }
        loggedInUser();
      
    }
    return (
        <div className="register__container">
            <form>
                <div className="login__name">
                <label htmlFor="login__name">Enter Your Name</label>
                <input type="text" name="login__name" onChange={(e)=>{
                    changeDetails((prev)=>{
                        return {...prev,name:e.target.value}
                    })
                }}></input>
                </div>

                <div className="login__email">
                <label htmlFor="login__email">Enter Your Email</label>
                <input type="text" name="login__email" onChange={(e)=>{
                    changeDetails((prev)=>{
                        return {...prev,email:e.target.value}
                    })
                }}></input>
                </div>
                
                <div className="login__pwd">
                <label htmlFor="login__password">Enter Your Password</label>
                <input type="text" name="login__password" onChange={(e)=>{
                    changeDetails((prev)=>{
                        return {...prev,pwd:e.target.value};
                    })
                }}></input>
                
                </div>
                <button type="submit" onClick={handleClick}>Login</button>
            </form>
        </div>
    )
}


