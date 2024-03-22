/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import ExamHistory from "./ExamHistory";
import { UserContext } from "../../App";
import Axios from "axios";

const ExamDashboard = () => {
  const { loading, setLoading, BASE } = useContext(UserContext);
  const [examDashboard, setExamDashboard] = useState({
    feedbackExams: [],
    topicalExams: [],
    pastPapersExams: [],
  });

  async function FetchExamData() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/examDashboard/getExams`, {
        userId: "65fd130bc243afb3760aa723",
      });
      if (response.status === 200) {
        setExamDashboard(response.data);
      }
      console.log(`The response is ${JSON.stringify(response.data)}`);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Error!");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchExamData();
  }, []);

  return loading ? (
    "Loading..."
  ) : (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h1>Exam Dashboard</h1>
      {/* <div className="container" style={{ margin: "40px" }}>
        <ExamHistory />
      </div> */}
      <div className="container" style={{ margin: "20px" }}>
        {examDashboard.feedbackExams.length ||
        examDashboard.topicalExams.length ||
        examDashboard.pastPapersExams.length ? (
          <div className="feedback" style={{ margin: "20px", padding: "20px" }}>
            {examDashboard.feedbackExams.map((x) => (
              <div key={x._id}>
                <h1>{x.examType}</h1>
                <p>Total Mark: {x.totalMark}</p>
                <p>Mark: {x.mark}</p>
                <button>{`Start ${x.examType} Exam!`}</button>
              </div>
            ))}
            <div className="topical">
              <br />
              {examDashboard.topicalExams.map((x) => (
                <div key={x._id}>
                  <h1>{x.examType}</h1>
                  <p>Total Mark: {x.totalMark}</p>
                  <p>Mark: {x.mark}</p>
                  <button>{`Start ${x.examType} Exam!`}</button>
                </div>
              ))}
            </div>
            <div className="pastpaperex">
              <br />
              {examDashboard.pastPapersExams.map((x) => (
                <div key={x._id}>
                  <h1>{x.examType}</h1>
                  <p>Total Mark: {x.totalMark}</p>
                  <p>Mark: {x.mark}</p>
                  <button>{`Start ${x.examType} Exam!`}</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
};

export default ExamDashboard;
