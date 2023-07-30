import { faCamera, faComment, faFaceSmile, faMagnifyingGlass, faMicrophone, faPaperclip, faShare, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import loader from "../Adopt/loader";
import "./chat.css";
export default function useChat(){

    const loc = window.location.href;
const length = loc.split('/').length;
const petOwner = loc.split('/')[length-2];
const loggedIn = loc.split('/')[length-1];


const [ownerData,changeOwnerData] = useState(null);
const [loggedInData,changeLoggedData] = useState(null);
console.log(ownerData ,' and ' , loggedInData)

useEffect(()=>{

    async function getData(id,check){
        const data = await fetch('http://localhost:6969/def/get',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({_id : id})
        })

        if(data.ok){
            const res = await data.json();
            console.log('got the user data',res);
            if(check){
                changeLoggedData(res);
            }else{
                changeOwnerData(res);
            }
        }else{
            console.log('there was some error while fetchig the data');
        }

        
    }
console.log(loggedIn)
    getData(loggedIn,true);
        getData(petOwner,false);

},[])
console.log('the pet owner and the loggedIn are ,',petOwner, 'and',loggedIn);
if(!ownerData || !loggedInData){
    return loader;
}else{
    return (
        <div className="chat__container"> 
        <div className="chat__sidebar">
            <div className="logged__info wi">
                <div><img src={loggedInData.image}></img></div>
                <div className="flex flex-col"><span className="text-blue-400 text-lg font-bold">{loggedInData.name.charAt(0).toUpperCase()+loggedInData.name.slice(1)}</span> <span className="-mt-2 text-sm">Pet Owner</span></div>
            </div>
            <div className="search relative" >
                <div className="ip__container relative">
                    
                       <input onChange={(e)=>{
                        e.target.nextElementSibling.firstElementChild.classList.add('dpnone');
                        e.target.nextElementSibling.lastElementChild.classList.add('addeffects')
                       }} className="wi p-2 pupu" name="search" type="text"></input> <label htmlFor="search" className={`absolute flex  left-12 top-2`}> <span className="absolute top-0.5 -left-7 df"><FontAwesomeIcon icon={faMagnifyingGlass} /></span> <span>Search Friends</span></label> </div>
            </div>

            <div className="logged__history"></div>
        </div>

        <div className="chat__main">
            <div className="top__container">
                <span><img src={ownerData.image}></img></span>
                <span>{ownerData.name.charAt(0).toUpperCase()+ ownerData.name.slice(1)}</span>
            </div>
            <div className="horizontal__line"><span className="hlcontent">Conversation</span></div>
            <div className="main__window"></div>
            <div className="bottom__container">
                <div className="input__container relative">
                    <div className="absolute left-4 top-3"><FontAwesomeIcon icon={faMicrophone} style={{
                        cursor: "pointer",
                    }}/></div> 
                    <div className=" flex posi"> <input onChange={(e)=>{
                        e.target.nextElementSibling.classList.add('main')
                    }} name="write"></input> <label htmlFor="write">  <span>Write Something</span> </label> </div>
                    <div className="flex icons">
                    <FontAwesomeIcon icon={faPaperclip} style={{
                    fontSize : '25px',
                    backgroundColor: 'white',
                    cursor: "pointer"
                }}/>
                    <FontAwesomeIcon icon={faCamera} style={{
                    fontSize : '25px',
                    backgroundColor: 'white',
                    cursor: "pointer"
                }}/>
                    <FontAwesomeIcon icon={faFaceSmile}  style={{
                    fontSize : '25px',
                    color: 'black',
                    cursor: "pointer"
                }} />
                    <FontAwesomeIcon icon={faShare} style={{
                        fontSize : '40px',
                        color : 'blueviolet',
                        marginLeft : '10px',
                        cursor: "pointer"
                    }}/>
                    </div>
                    
                </div>
            </div>
        </div>

        <div className="chat__info">
            <div className="ownerData">
                <img src={ownerData.image}></img>
                <span>{ownerData.name.charAt(0).toUpperCase()+ownerData.name.slice(1)}</span>
                <span>A dog Lover</span>
            </div>

            <div className="flex m-auto justify-center w-full ">
                <div className="flex flex-col p-4 items-center"> <span><FontAwesomeIcon icon={faComment} style={{
                    fontSize : '40px',
                    color : 'blueviolet'
                }} /></span> <span>Chat</span> </div>
                <div className="vertical__line" ></div>
                <div className="flex flex-col p-4 items-center"> <span><FontAwesomeIcon icon={faVideo} style={{
                    fontSize : '40px',
                    color : 'blueviolet'
                }} /></span> <span>Video Call</span> </div>
            </div>
        </div>
         </div>
    )
}
}


