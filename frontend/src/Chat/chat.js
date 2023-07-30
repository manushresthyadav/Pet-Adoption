import "./chat.css";
const loc = window.location.href;
const length = loc.split('/').length;
const petOwner = loc.split('/')[length-2];
const loggedIn = loc.split('/')[length-1];

console.log('the pet owner and the loggedIn are ,',petOwner, 'and',loggedIn);
export default function (){
    return (
        <div className="chat__container"> 
        <div className="chat__sidebar">
            
        </div>

        <div className="chat__main"></div>

        <div className="chat__info"></div>
         </div>
    )
}