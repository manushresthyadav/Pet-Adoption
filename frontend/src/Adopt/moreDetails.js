import { faArrowLeft, faArrowRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './more.css';
export default function useMoredetails(){
    
const {id} = useParams();
console.log(id);
    const [details,changeDetails] = useState(null);
    const [ownerData,changeOwnerData] = useState(null);
    const [images,changeImages] = useState(null);
    const [active,changeActive] = useState(0);
    console.log(details);
    useEffect(()=>{
        async function getOwnerData(){
            if(details){
                const owner_id = details.owner_id;
                console.log('got the owner id : ',owner_id);

                const data = await fetch('http://localhost:6969/def/get',{
                    method : 'POST',
                    headers : {'Content-Type':'application/json'},
                    body : JSON.stringify({_id : owner_id})
                });

                if(data.ok){
                    const res = await data.json();
                    console.log('got the owner data ',res);
                    changeOwnerData(res);
                }else{
                    console.log('there was some error fetching the owner details', data.error);
                }
            }
        }

        getOwnerData();
        
    },[details]);

    
    useEffect(()=>{
        async function getData(){
            const data = await fetch(`http://localhost:6969/def/pet-details/${id}`);
            if(data.ok){
                const res = await data.json();
                
                changeDetails(res);
            }else{
                console.log('there was some error while fetching the individual data of the pet',data.error);
            }
        }

        getData();
    },[]);

    useEffect(()=>{
        async function getImages(){
            if(!details){
                return;
            }
            const data = await fetch(`https://dog.ceo/api/breed/${details.breed}/images/random/3`);
            if(data.ok){
                const res = await data.json();
                console.log(res);
                console.log(res.message);
                changeImages(res.message)
            }
        }

        getImages();
    },[details])
    
    return(
        <>
        <div className="details__pet">
        <div className="detailed__container">
            {details && <>
            
                <div className="pet__image"><img src={details.image} className="r"></img></div>
                <div className="pet__details mb-8">
                    <span>Hola! Dog saviour! Here's my intro</span> 
                </div>
                <div className="pet__details">
                    <span>Hello! My name is {details.name}</span> 
                </div>

                <div className="pet__details">
                    <span>I am {details.age} years old {details.color} dog</span> 
                </div>

                <div className="pet__details">
                    <span>Proud to be a {details.breed} {details.sex} dog</span> 
                </div>

                <div className="pet__details">
                    <span className="text-base ">My Current caretaker remarks about me </span> 
                    <span className="text-center pet__quality">{details.quality}</span> 
                </div>
                
            </>
            
            }
        </div>

        <div className="detailed__container">
            {ownerData && details && <>
            
                <div className="pet__image"><img src={ownerData.image}></img></div>
                <div className="pet__details mb-8">
                    <span>Hola! Dog Lover! Here's my intro</span> 
                </div>
                <div className="pet__details">
                    <span>Hello! My name is {ownerData.name}</span> 
                </div>

                <div className="pet__details">
                    <span>I live in {details.address} along with my Pet</span> 
                </div>

                <div className="pet__details">
                    <span>Contact Details</span>
                    <span>Phone Number : {details.number}</span> 
                    <span>Email : {ownerData.email}</span> 
                </div>

                <div className="pet__details">
                    <span className="text-base ">As mentioned I cant take care of my dog from now because  </span> 
                    <span className="text-center pet__quality">{details.reason}</span> 
                </div>

                <div className="pet__details chat">
                    <span>Chat With Owner</span> 
                </div>
                
            </>
            
            }
        </div>

       

        </div>

<div className="photo__dog relative">
    <div><span>Photos of similar breed dog for clarity</span></div>
    <div className="img__dog">
{images && images.map((elm,index)=>{
    
    return <div className={`sim__img ${index===active?"":"add"}`}><img src={elm}></img></div>
})}
<div className="arrow">
<span><FontAwesomeIcon icon={faArrowLeft} onClick={()=>{
    changeActive((prev)=>{
        if(prev==0){
            return 2;
        }
        return prev-1;
    })
}}/></span>
<div className="flex"><span className={`${active===0?"":"bg"}`}><FontAwesomeIcon icon={faCircle} size="2xs" /></span><span className={`${active===1?"":"bg"}`}><FontAwesomeIcon icon={faCircle} size="2xs" /></span><span className={`${active===2?"":"bg"}`}><FontAwesomeIcon icon={faCircle} size="2xs" /></span></div>
<span><FontAwesomeIcon icon={faArrowRight} onClick={()=>{
    changeActive((prev)=>{
        if(prev==2){
            return 0;
        }
        return prev+1;
    })
}}/></span>
</div>

</div>
</div>





</>
    )
}


