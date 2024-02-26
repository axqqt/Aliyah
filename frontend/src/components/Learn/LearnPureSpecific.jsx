/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Axios from "axios";

const LearnPureSpecific = () => {

    const baseURL = "http://localhost:8000/resources/topic/:id"

    let { id } = useParams();
    const [data,setData] = useState([])

    async function IDCall(){
        try{
            const {data} = await Axios.get(`${baseURL}/${id}`,{topic:"Pure Mathematics I"})
            if(data.status===200){
                    setData(data);
            }else{
                alert("An error occured while fetching!")
            }
        
        }catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        IDCall();
    },[])    

  return (
    <div><h1>Pure Maths Specific Page</h1>{data && data.length ? JSON.stringify(data) : <h1>No results found!</h1>}</div> //do the mapping @Rukshan
  )
}

export default LearnPureSpecific