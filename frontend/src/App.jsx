import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/graphs/Home";
import UnknownPage from "./components/Unknown";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import ForgotPass from "./components/User/Forgot";
import Gemini from "./components/Gemini/Gemini";
// import ExamPage from "./components/Exam/Exam"
import ExamFinal from "./components/Exam/ExamFinalized"
import Generate from "./components/Exam/Generate";
import ExamPage from "./components/Exam/Exam";


export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState(false);
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  const [response, setResponse] = useState("");




  return (
    <>
      <Gemini />
      {/**Needs to generally exist on the side with a popup type scenario! */}
      <BrowserRouter>
        <UserContext.Provider
          value={{
            loading,
            setLoading,
            log,
            setLog,
            user,
            setUser,
            status,
            setStatus,
           response,setResponse
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPass />} /> {/**Optional */}  
            <Route path="/exam" element={<Generate/>}></Route>
            <Route path="/examfinal" element={<ExamFinal/>}></Route>
            <Route path="/examination" element={<ExamPage/>}></Route>
            <Route path="*" element={<UnknownPage />} />

          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
