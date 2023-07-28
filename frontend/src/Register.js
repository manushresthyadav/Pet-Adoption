import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
export default function Register(){
const Navigate = useNavigate();
    const [details,changeDetails] = useState({
        name:"",
        email:"",
        pwd:"",
        image: ""
    })
    console.log(details);
    function handleClick(e){
        e.preventDefault();
        const name = document.getElementsByClassName("name")[0].lastElementChild.value;
        const pwd = document.getElementsByClassName("pwd")[0].lastElementChild.value;
        const email = document.getElementsByClassName("email")[0].lastElementChild.value;
        console.log(name,pwd);
        console.log(details);
        const json_details = {
            name : details.name,
            email:details.email,
            pwd : details.pwd,
            image : details.image
        }

         const registeredUser =  async function(){
            await fetch('http://localhost:6969/def/register',{
            method: 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(json_details)
        });
        alert('User is registered');
        Navigate('Login');
        } 

        registeredUser();
        // Navigate('/login');
    }

    async function handleImageChange(e) {
        const file = e.target.files[0];
        const base64String = await convertToString(file);
      
        changeDetails((prev) => {
          return { ...prev, image: base64String };
        });
      }
      
      async function convertToString(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
      
          fileReader.readAsDataURL(file);
      
          fileReader.onload = () => {
            console.log(fileReader.result);
            resolve(fileReader.result);
          };
      
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      }
    return (
        <div className="parent__register">
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

                <div>
        <label htmlFor="add_images">Upload Image : </label>
        <input name="add_images" type="file" onChange={(e)=>{
            changeDetails((prev)=>{
                return {...prev, image : handleImageChange(e)}
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
        </div>
    )
}