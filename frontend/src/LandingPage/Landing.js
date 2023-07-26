import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
export default function Landing(){
    const [data,changeData] = useState();
    const Navigate = useNavigate();
    console.log('the data of the user is  : ', data);
    useEffect(()=>{
        async function getDataAsCookies(){
            const UserData =  await fetch('http://localhost:6969/def/get',{
                method: 'POST',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify({_id : localStorage.getItem('_id')})
            });
            if(UserData.ok){
                const res = await UserData.json();
                console.log(res);
                changeData(()=>{
                    return res;
                })
            }else{
                const {error} = await UserData.json();
                console.log('the error is',error);
                alert('unable to get the login information');
                // Navigate('/register');
            }
        };

        async function getDataFromBrowser(){
            const userToken = localStorage.getItem('jwt');
            const userName = localStorage.getItem('name');
            const userId = localStorage.getItem('uid');

            changeData({userToken , userName , userId});
        }

        
        getDataAsCookies();
    },[]);
    return (
        <div className='landing__container'>
            <navbar className="navbar">
                <ui className="navbar__list">
                    <div>
                    <li>LOGO AND TITLE</li>
                    </div>
                    <div>
                    <li>HOME</li>
                    <li>ADOPT</li>
                    <li>SHOP</li>
                    <li>CONTACT US</li>
                    <li onClick={()=>{
                        window.location.href="/login";
                    }} className='cursor-pointer'>{!data && 'LOGIN'}</li>
                    <li>{data && <h1>naam idhar</h1>}</li>
                    </div>
                </ui>
            </navbar>
        </div>
    )
}