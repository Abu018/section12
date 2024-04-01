import React, { useCallback, useState } from "react";
import quizData from "./Quizz.jsx";
import complete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswer.length : userAnswer.length - 1;
  const totalQuestions = quizData.length;
  const correctAnswers = userAnswer.filter(
    (answer, index) => answer === quizData[index].correctAnswer
  ).length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswer((prevAnswers) => [...prevAnswers, selectedAnswer]);
      setTimeout(() => {
        if (selectedAnswer === quizData[activeQuestionIndex].correctAnswer) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (activeQuestionIndex === quizData.length) {
    return (
      <div id="summary">
        <img src={complete} alt="completed" />
        <h2>Quiz Completed!</h2>
        <div>
          Your Score:
          <p>Correct Answers: {correctAnswers}</p>
          <p>Total Questions: {totalQuestions}</p>
          <p>
            Result: {correctAnswers}/{totalQuestions}
          </p>
          {quizData.map((question, index) => (
            <div key={index}>
              <p>Question: {question.question}</p>
              <p>Selected Answer: {userAnswer[index]}</p>
              <p className="correct">Correct Answer:{question.correctAnswer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{quizData[activeQuestionIndex].question}</h2>
        <ul id="answers">
          {quizData[activeQuestionIndex].options.map((option, index) => (
            <li key={option} className="answer">
              <button
                onClick={() => handleSelectAnswer(option)}
                className={
                  answerState === "answered"
                    ? option === quizData[activeQuestionIndex].correctAnswer
                      ? "correct"
                      : userAnswer.includes(option)
                      ? "wrong"
                      : ""
                    : ""
                }
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Quiz;
