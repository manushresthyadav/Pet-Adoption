
import { useState } from 'react';
import './addPet.css';
export default function useAddpet(){

    const [data,changeData] = useState({
        name : "",
        age : "",
        image : "",
        color : "",
        sex : "",
        quality : ""
    })
    function convertToString(file){
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onLoad = ()=>{
                resolve(fileReader.result)
            };
            fileReader.onerror = (error)=>{
                reject(error);
            }
            
        })
    }

return (
    <div className="addpet__container"> 
    <form className='flex flex-col pet_form'>
        <div>
        <label htmlFor="pet_name">Pet Name</label>
        <input name="pet_name"></input>
        </div>
        <div>
        <label htmlFor="pet_age">Pet Age</label>
        <input name="pet_age"></input>
        </div>

<div>
        <label htmlFor="add_images">Upload Image : </label>
        <input name="add_images" type="file"></input>
        </div>

        <div>
            <label htmlFor='pet_clr'>Color</label>
            <input  name='pet_clr'></input>
        </div>

        <div >
           <label htmlFor='Sex'>Sex</label>
           <div className='flex gap-x-8' name='Sex'>
           <label className='mr-10'>
            <input type="radio" name="color" value="Male"/>
            Male
        </label>
        <label>
            <input type="radio" name="color" value="Female"/>
            Female
        </label>
           </div>
        </div>

        <div >
            <label htmlFor='qualities'>Describe Your Pet :</label>
            <textarea className='' name='qualities' cols={'40'} rows={'10'}></textarea>
        </div>

        
    </form>
    </div>
)


}


{/* <label htmlFor='sex'>Sex</label>
<div className='male_radio flex gap-x-8 mr-10'>
<label htmlFor='male'>Male</label>
<input type='radio' name='male'></input>
</div>
<div className='female_radio flex gap-x-8'>
<label htmlFor='male'>Female</label>
<input type='radio' name='Female'></input>
</div> */}