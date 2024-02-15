import "./QuestionComponent.css"
import { useEffect, useState } from "react";

function SubQuestion( {sqNum, sqText} ) {
    return (
        <div className="sub-question">
        <div className="sub-question-text-container">
            <div className="sq-num">{sqNum}</div>
            <div className="sub-question-text">{sqText}</div>
        </div>
        <div className="figure-for-sub-question"></div>
        <div className="answer-for-sub-question">
            <input className="answer-input" placeholder="Answer..."></input>
            <div className="mark-for-sq">(2 marks)</div>
        </div>
    </div>
    );
}

function QuestionComponent( {question, mqNum} ) {

    // If there is only one answer, make sure theres only the main text and the answer
    const [isOneAnswerQuestion, setIsOneAnswerQuestion] = useState(false);
    const [hasContext, setHasContext] = useState(false);
    const [subQuestions, setSubQuestions] = useState([]);

    useEffect(() => {
        // If there is only one answer, set this to true
        if (question.questionsGrid.length === 1) {
            setIsOneAnswerQuestion(true);
        } else {
            setIsOneAnswerQuestion(false);
        }
        // If there is context, set this to true
        if (question.answersGrid[0] === "") {
            setHasContext(true);
        } else {
            setHasContext(false);
        }
    }, [question]);

    //If there is context, sub questions start from index 1
    useEffect(() => {
        if (hasContext) {
            let newArray = [];
            for (let i = 1; i < question.questionsGrid.length; i++) {
                newArray.push(<SubQuestion key={i} sqNum={i} sqText={question.questionsGrid[i]} />);
            }
            setSubQuestions(newArray);
        }
    }, [hasContext])

    function log() {
        console.log("One answer question: " + isOneAnswerQuestion);
        console.log("Has context: " + hasContext);
        console.log(subQuestions);  
    }

    return (
        <>
        <div className="question-component-container">
            <div className="main-question-container">
                <div className="main-text-container">
                    <div className="mq-num" onClick={log}>{mqNum}</div>
                    <div className="main-text">{question.questionsGrid[0]}</div>
                </div>
                {isOneAnswerQuestion && <input className="answer-input" placeholder="Answer..."></input>}
            </div>
            {/* If it is a one answer question, do not display subquestions */}
            {!isOneAnswerQuestion &&            
            <div className="sub-question-container">
                {subQuestions};
            </div>}
        </div>
        </>
    );
}

export default QuestionComponent;