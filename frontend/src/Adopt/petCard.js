
import './petCard.css';
export default function usePetCard({elm}){
    
function capitalFirst(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
elm.name = capitalFirst(elm.name);
elm.color = capitalFirst(elm.color);
elm.quality = capitalFirst(elm.quality);
    return (
        <div className='pet_container'>
                <img src={elm.image} alt="image not found" ></img>
                <div>{elm.name}</div>
                <div>{elm.age}</div>
                <div>{elm.sex}</div>
                <div>{elm.quality}</div>
                <div>{elm.color}</div>
            </div>
    )
}