
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addPet.css';
export default function useAddpet(){

    const [data,changeData] = useState({
        name : "",
        age : "",
        image : "",
        color : "",
        sex : "",
        quality : "",
        breed: "",
        address: "",
        number : "",
        reason: ""
    });

    const Navigate = useNavigate();
    
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
    

    async function handleImageChange(e) {
        const file = e.target.files[0];
        const base64String = await convertToString(file);
      
        changeData((prev) => {
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
      
      

    function handleSubmit(e){
        e.preventDefault();
        console.log('you are trying to submit ur form with the details ', data);
        const owner_id = localStorage.getItem('_id');
        console.log(owner_id);
        async function submitData(){
            const dataRec = await fetch('http://localhost:6969/def/add-pet',{
                method : 'POST',
                body: JSON.stringify({...data,owner_id:owner_id}),
                headers : {'Content-Type': 'application/json'}
            });
            if(dataRec.ok){
                const res = await dataRec.json();
                console.log('data received , ur pet is added', res);
                Navigate('/adopt');
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
                return {...prev, image : handleImageChange(e)}
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

        <div>
            <label htmlFor='pet_clr'>Address</label>
            <input  name='pet_clr' onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,address: e.target.value}
                })
            }}></input>
        </div>


        <div>
            <label htmlFor='pet_clr'>Phone Number</label>
            <input  name='pet_clr' onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,number: e.target.value}
                })
            }}></input>
        </div>

        <div>
            <label htmlFor='pet_clr'>Reason for selling</label>
            <input  name='pet_clr' onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,reason: e.target.value}
                })
            }}></input>
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