
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import loader from '../Adopt/loader';
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
    const [chk,changechk] = useState(null);
    const [prevImg, changePrevImg] = useState(null);
    console.log(data);
    const Navigate = useNavigate();
    const {id} = useParams();
    console.log(id);
    useEffect(()=>{
        if(id){

            async function getPetData(){
                const data = await fetch('http://localhost:6969/def/getPetData',{
                    method : 'POST',
                    headers : {'Content-Type' : 'application/json'},
                    body : JSON.stringify({id})
                })

                if(data.ok){
                    const res = await data.json();
                    changeData(res);
                    changechk('changedGotData');
                    changePrevImg(res.image);
                }else{
                    console.log('there was some error getting the data',data.error);
                    changechk('changedGotData');
                }
                
            }
            
            getPetData();
        }else{
            changechk('changed');
        }
    },[])
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
        var finalCheck;
        if(data.image==="" && !prevImg){
            finalCheck = prevImg;
        }else{
            finalCheck = data.image;
        }
        console.log('you are trying to submit ur form with the details ', data);
        const owner_id = localStorage.getItem('_id');
        console.log(owner_id);
        async function submitData(){
            const dataRec = await fetch('http://localhost:6969/def/add-pet',{
                method : 'POST',
                body: JSON.stringify({...data,owner_id:owner_id,image : finalCheck}),
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
    if(!chk){
        return loader;
    }else{
return (
    <div className="addpet__container"> 
    <form className='flex flex-col pet_form'>
        <div>
        <label htmlFor="pet_name">Pet Name</label>
        <input    value={data.name} name="pet_name" onChange={(e)=>{
            changeData((prev)=>{
                return {...prev,name: e.target.value}
            })
        }}></input>
        </div>

        <div >
            <label htmlFor='breed'>Breed</label>
            <select value={data.breed} onChange={(e)=>{
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
        <input   value={data.age} name="pet_age" onChange={(e)=>{
            changeData((prev)=>{
                return {...prev,age: e.target.value}
            })
        }}></input>
        </div>

<div>
        <label htmlFor="add_images">Upload Image : </label>
        <input   name="add_images" type="file" onChange={(e)=>{
            changeData((prev)=>{
                return {...prev, image : handleImageChange(e)}
            })
        }}></input>
        </div>

        <div>
            <label htmlFor='pet_clr'>Color</label>
            <input value={data.color}  name='pet_clr' onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,color: e.target.value}
                })
            }}></input>
        </div>

        <div >
           <label htmlFor='Sex'>Sex</label>
           <div className='flex gap-x-8' name='Sex'>
           <label className='mr-10'>
            <input checked={data.sex === "Male"} type="radio" name="color" value="Male" onClick={(e)=>{
                changeData((prev)=>{
                    return {...prev,sex: 'Male'}
                })
            }}/>
            Male
        </label>
        <label>
            <input checked={data.sex === "Female"} type="radio" name="color" value="Female" onClick={(e)=>{
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
            <input value={data.address}  name='pet_clr' onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,address: e.target.value}
                })
            }}></input>
        </div>


        <div>
            <label htmlFor='pet_clr'>Phone Number</label>
            <input value={data.number}  name='pet_clr' onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,number: e.target.value}
                })
            }}></input>
        </div>

        <div>
            <label htmlFor='pet_clr'>Reason for selling</label>
            <input value={data.reason}  name='pet_clr' onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,reason: e.target.value}
                })
            }}></input>
        </div>



        <div >
            <label htmlFor='qualities'>Describe Your Pet :</label>
            <textarea value={data.quality} className='' name='qualities' cols={'40'} rows={'10'} onChange={(e)=>{
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