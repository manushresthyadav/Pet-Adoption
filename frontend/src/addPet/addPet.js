
import { useEffect, useState } from 'react';
import './addPet.css';
export default function useAddpet(){

    const [data,changeData] = useState({
        name : "",
        age : "",
        image : "",
        color : "",
        sex : "",
        quality : "",
        breed: ""
    });
    const [options,changeOption]=useState("");
    const [selected,changeSelected] = useState();
    
    useEffect(()=>{
        async function getData(){
            const newData = await fetch('https://dog.ceo/api/breeds/list/all');
            if(newData.ok){
                const res = await newData.json();
                const arr = Object.entries(res.message);
                const main = arr.map((elm,index)=>{
                    return elm[0];
                });
                
                console.log(main);
                changeOption(main);
            }
        }
        getData();
    },[])
    console.log(data);
    async function convertToString(file){
        return await new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onLoad = ()=>{
                console.log(fileReader.result);
                resolve(fileReader.result)
            };
            fileReader.onerror = (error)=>{
                reject(error);
            }
            
        })
    }

    function handleSubmit(){
        console.log('you are trying to submit ur form with the details ', data);

        async function submitData(){
            const data = await fetch('http://localhost:6969/def/add-pet');
            if(data.ok){
                const res = await data.json();
                console.log('data received , ur pet is added', res);
            }else{
                console.log('there was some error while adding ur pet');
            }
        }
        submitData();
    }
return (
    <div className="addpet__container"> 
    <form className='flex flex-col pet_form'>
        <div>
        <label htmlFor="pet_name">Pet Name</label>
        <input name="pet_name" onChange={(e)=>{
            changeData((prev)=>{
                return {...prev,name: e.target.value}
            })
        }}></input>
        </div>

        <div >
            <label htmlFor='breed'>Breed</label>
            <select onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,breed: e.target.value}
                })
            }}>
                {options && options.map((elm)=>{
                    return <option key={elm} value={elm}>{elm}</option>
                })}
            </select>
        </div>

        <div>
        <label htmlFor="pet_age">Pet Age</label>
        <input name="pet_age" onChange={(e)=>{
            changeData((prev)=>{
                return {...prev,age: e.target.value}
            })
        }}></input>
        </div>

<div>
        <label htmlFor="add_images">Upload Image : </label>
        <input name="add_images" type="file" onChange={(e)=>{
            changeData((prev)=>{
                return {...prev, image : convertToString(e.target.files[0])}
            })
        }}></input>
        </div>

        <div>
            <label htmlFor='pet_clr'>Color</label>
            <input  name='pet_clr' onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,color: e.target.value}
                })
            }}></input>
        </div>

        <div >
           <label htmlFor='Sex'>Sex</label>
           <div className='flex gap-x-8' name='Sex'>
           <label className='mr-10'>
            <input type="radio" name="color" value="Male" onClick={(e)=>{
                changeData((prev)=>{
                    return {...prev,sex: 'Male'}
                })
            }}/>
            Male
        </label>
        <label>
            <input type="radio" name="color" value="Female" onClick={(e)=>{
                changeData((prev)=>{
                    return {...prev,sex: 'Female'}
                })
            }}/>
            Female
        </label>
           </div>
        </div>

        <div >
            <label htmlFor='qualities'>Describe Your Pet :</label>
            <textarea className='' name='qualities' cols={'40'} rows={'10'} onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,quality: e.target.value}
                })
            }}></textarea>
        </div>

        <button className='form_btn' onClick={handleSubmit}>Submit</button>
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


// https://dog.ceo/api/breeds/list/all