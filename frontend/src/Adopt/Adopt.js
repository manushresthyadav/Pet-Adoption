import { useEffect, useState } from 'react';
import './Adopt.css';
import PetCard from "./petCard";
export default function useAdopt(){
    const [details,changeDetails] = useState([]);
    console.log(details);
    useEffect(()=>{
        async function getAllPets(){
            const data = await fetch('http://localhost:6969/def/add-pet');
            if(data.ok){
                const res = await data.json();
                changeDetails((prev)=>{
                    return [...prev,...res];
                })
            }else{
                console.log('there was some error retrieving the data from fetch request',data.error);
            }
        }
        getAllPets();
    },[]);

    function handleChange(data){
        console.log(data);
        // changeDetails((prev)=>{
        //     return {...prev,data};
        // })
    }
    return(
        <>
        <div className="adopt__container w-full flex-col">
            <div className="adopt__navbar font-bold text-2xl items-center justify-center">
                <ul className="flex list-none gap-x-14 ">
                    <li><a href='/ui'>Home</a></li>
                    <li><a href='/partner'>Sell Your Pet</a></li>
                    <li><a href='/donate'>Donate us</a></li>
                    <li><a href='/contact'>Contact Us</a></li>
                </ul>
            </div>
        </div>
<div className='contains__pet'>
        {details && details.map((elm)=>{
                {console.log(elm.image)}
                return <PetCard elm={elm}/>
            })}
            </div>
        </>
    )
}