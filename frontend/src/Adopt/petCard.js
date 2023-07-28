
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import './petCard.css';
export default function usePetCard({elm}){
    
function capitalFirst(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
elm.name = capitalFirst(elm.name);
elm.color = capitalFirst(elm.color);
elm.quality = capitalFirst(elm.quality);
const textVariant = {
    beforeHover: {
        opacity: 0,
        y: -50
      },
      onHover: {
        opacity: 1,
        y: 0,
        scale: 1.2,
        transition: {
          type: "tween"
        },
      }
}

const imgVariant = {
    beforeHover: {},
  onHover: {
    scale: 1.1,
  },
  
}
const id = elm._id;
console.log('the id is: ',id);
    return (
        <div className='pet_container relative'>
            <motion.div variants={imgVariant} initial="beforeHover" whileHover="onHover" className="relative getit">
                
            <img src={elm.image} alt="image not found" ></img>
            </motion.div>
            <Link to={`pet-details/`+id}>
            <motion.div variants={textVariant} initial="beforeHover" whileHover="onHover"  className="text_img " onMouseEnter={(e)=>{
                const parent = e.target.parentNode;
                const prev = parent.previousElementSibling;
                console.log(prev,'mouse has entered');
                if(prev){
                    prev.classList.add('highlight');
                }
            }} onMouseLeave={(e)=>{
                const parent = e.target.parentNode;
                const prev = parent.previousElementSibling;
                console.log(prev,'mouse has left');
                if(prev){
                    prev.classList.remove('highlight');
                }
            }} 
            
            ><span>Know More</span></motion.div>
            </Link>
                
                <div className="name_age">
                <div>Name: {elm.name}</div>
                <div className="pet_age"><FontAwesomeIcon icon={faCalendar} /><span>Age: {elm.age}</span></div>
                </div>
                
                <div className="sex_color flex justify-evenly">
                <div className="m-auto">Gender: {elm.sex}</div>
                <div className="m-auto">Color: {elm.color}</div>
                </div>
                
                
            </div>
    )
}