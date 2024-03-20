/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const LearnClicked = () => {
  const [hoverRef, isHovering] = useHover();
  const {
    BASE,
    theProgressVal,
    setLessons,
    setLoading,
    loading,
    TheSource,
    setTheProgressVal,
    topicRelated,
    setTopicRelated,
    user,
    falseTopics,
    setFalseTopics,
    theTopic,
  } = useContext(UserContext);
  const { lesson } = useParams();
  const [lessonCounter, setLessonCounter] = useState(0);
  const [status, setStatus] = useState("");
  const [theLessonName, setTheLessonName] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.post(`${BASE}/resources/fromtopics`, {
          userId: "65f86f434b9403f9d70d8aa3",
          topic: lesson,
          source: TheSource,
        });
        console.log(`The topic ${lesson}\nThe source : ${TheSource}`);
        console.log(response.data);
        setTopicRelated(response.data);
        setStatus("");
      } catch (error) {
        console.error(error.message);
        if (error.response.status === 404) {
          setStatus("No resources found!");
        }
      } finally {
        setLoading(false);
      }
    };

    async function FalseTopics() {
      try {
        const response = await Axios.post(`${BASE}/resources/false-topic`, {
          userId: "65f86f434b9403f9d70d8aa3",
          topic: lesson,
          source: TheSource,
        });
        if (response.status === 200) {
          setFalseTopics(response.data);
        }
      } catch (err) {
        if (err.status === 404) {
          setStatus("No data found!");
        }
        console.error(err.message);
      }
    }

    fetchData();
    FalseTopics();
  }, [lesson]); // Fetch data when lesson changes

  // useEffect(() => {
  //   const getNumberOfLessonForProgress = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await Axios.get(BASE, { userId: user.id });
  //       if (data.status === 200) {
  //         setLessons(data);
  //         setTheProgressVal(data.topics.length / 100);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setStatus(
  //         error.response
  //           ? error.response.status
  //           : "Error while processing data!"
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getNumberOfLessonForProgress();
  // }, []); // Fetch data once on component mount

  // const [lessonName, setLessonName] = useState("");

  async function FalseTopics() {
    try {
      const response = await Axios.post(`${BASE}/resources/false-topic`, {
        userId: "65f86f434b9403f9d70d8aa3",
        topic: "Quadratics",
        source: TheSource,
      });
      if (response.status === 200) {
        setFalseTopics(response.data);
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No data found!");
      }
      console.error(err.message);
    }
  }

  const IncrementProgress = async () => {
    try {
      const lessonNameArray = topicRelated.map((x) => x?.lessonTitle);

      const outcome = await Axios.put(`${BASE}/resources/progress/updates`, {
        userId: "65f86f434b9403f9d70d8aa3", //user.id
        topic: lesson,
        source: TheSource,
        lessonName: lessonNameArray[lessonCounter], // Get the first index in the lessonName array
      });

      if (outcome.status === 200) {
        setLessonCounter((prev) => prev + 1);
        FalseTopics();
      }

      console.log(outcome.data);
    } catch (error) {
      if (error.status === 404) {
        setStatus(`You have completed ${lesson}!`);
      }
      console.error(error.message);
    }
  };

  useEffect(()=>{
    FalseTopics()
  },[])

  // useEffect(() => {
  //   console.log(
  //     topicRelated !== null
  //       ? JSON.stringify(topicRelated[lessonCounter]?.lessonBody?.lessonSection)
  //       : "No data!"
  //   );
  // }, [topicRelated]);

  return topicRelated && topicRelated.length ? (
    loading ? (
      "Loading..."
    ) : (
      <>
        <div>
          {topicRelated.map((x, index) => (
            <div key={index} style={{ margin: "2%", padding: "2%" }}>
              {/* <nav>
                <ul>{x.lessonTitle}</ul>
              </nav> */}
              {index === lessonCounter ? (
                <div>
                  <h1>{x.lessonTitle}</h1>
                  {x?.lessonBody?.lessonSection &&
                    x?.lessonBody?.lessonSection.map((x) => {
                      return <h1 key={index}>{x}</h1>;
                    })}
                  {x?.lessonBody?.sectionImgURL &&
                    x?.lessonBody?.sectionImgURL.map((x, index) => {
                      return <img src={x} key={index}></img>;
                    })}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
          <button
            onClick={IncrementProgress}
            // onClick={() => {
            //   if (
            //     lessonCounter <=
            //     topicRelated[lessonCounter]?.lessonBody?.lessonSection.length
            //   ) {
            //     IncrementProgress(); //works
            //   } else {
            //     setStatus(`Congrats you have completed ${lesson}`);
            //     // setTimeout(() => {
            //     //   navigator("/learnprint");
            //     // }, 1500);
            //   }
            // }}
            // disabled={
            //   lessonCounter >=
            //   topicRelated[lessonCounter]?.lessonBody?.lessonSection.length
            // }
          >{`Next Page!`}</button>
        </div>
      </>
    )
  ) : (
    "No subtopic has been selected!"
  );
};

export default LearnClicked;
