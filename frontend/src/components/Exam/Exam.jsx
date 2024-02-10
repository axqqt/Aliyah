/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {useNavigate} from "react-router-dom"
// import MathJax from "better-react-mathjax"
import MathLive from "../Math";
import Axios from "axios";
import { UserContext } from "../../App";
import Scope from "./Scope";

const ExamPage = () => {
  const {status,setStatus} = useContext(UserContext)
  const [time, setTime] = useState(0);
  const startButtonRef = useRef();
  const stopButtonRef = useRef();
  const intervalRef = useRef();
  // const [value, setValue] = useState("");

  const navigator = useNavigate();
  let started = 0;

  // const startExamTimer = () => {
  //   if(started===0){  
  //     started++;  
   
  //     intervalRef.current = setInterval(() => {
  //       do{
  //         setTime((prev) => prev + 1);
  //       }while(time<60000) 
  //   }, 1000);}
  //   else{
  //     alert("Time's up!")
  //   }
  // };

  const stopExamTimer = () => { 
    clearInterval(intervalRef.current);
    setTimeout(() => {
      // Redirect to "/examfinal" after 2 seconds
     navigator("/examfinal") 
    }, 2000);
  };

  const sendExamData = async (id) => {
    if(time<20000){ //assuming at least 2 mins should be elapsed
      stopExamTimer();
      localStorage.setItem("time", time);
  
      //might have to set the exam marks in local storage to get in the finalized page!
      const sendAnswers = await Axios.post("") //route of question!
      if(sendAnswers.status===200){
        // setTimeout(() => {
        //   // Redirect to "/examfinal" after 2 seconds
        //  navigator("/examfinal") 
        // }, 2000);
      }else{
        setStatus("Error while sending answers!")
      }
    }else{
      alert("Way too early to submit!")
    }

   

  
  };

  useEffect(() => {
    return () => {
      // Cleanup the interval on component unmount
      clearInterval(intervalRef.current);
    };
  }, []);

  const selectTopics = ()=>{ 
     return (Scope)
  }

  return (
    <div>
      <h1>Exam Page</h1>
      <button onClick={selectTopics}>Select Topics!</button>
      {/* <button onClick={startExamTimer} ref={startButtonRef}>
        Start Exam!
      </button> */}

      <MathLive />
      <div>
        <h2>{`${time} seconds <- Time Elapsed`}</h2>
   
        <LineChart
          xAxis={[{ data: [0, 2, 3, 5, 8, 10] }]} //possibly an mapping to the cordinates?
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
      <button onClick={(e)=>{
        e.preventDefault(); //lets send the id and the corresponding answer!
        sendExamData()//x._id assuming x is used to iter!
      }} ref={stopButtonRef}>
        Done! 👍🏻
      </button>
      {status}
    </div>
  );
};

export default ExamPage;
