import { useCallback, useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeOut }) {
  const [reamningTime, setReamningTime] = useState(timeout);
  useEffect(() => {
    console.log("setting Timeout");
    const timeOUT = setTimeout(onTimeOut, timeout);
    return () => {
      clearTimeout(timeOUT);
    };
  }, [timeout, onTimeOut]);
  useEffect(() => {
    console.log("setting interval");
    const interval = setInterval(() => {
      setReamningTime((prevTime) => prevTime - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress id="question-time" max={timeout} value={reamningTime} />;
}
