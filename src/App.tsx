import React, { useState, useEffect, useRef } from "react";
import questions from "./questions.json";

interface IQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

// 打乱questions数组
const shuffle = (array: Array<string | object | number>) => {
  let currentIndex = array.length;
  let randomIndex = 0;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};

// 打乱questions数组
shuffle(questions);
// 打乱questions数组中的options
questions.forEach((question) => shuffle(question.options));

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const currentIndex = useRef<number>(0);

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const loadNewQuestion = () => {
    if (currentIndex.current === questions.length) {
      alert(`你的得分是${score}分`);
      return;
    }
    if (currentIndex.current < questions.length) {
      setCurrentQuestion(questions[currentIndex.current++]);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg max-w-lg mx-auto my-12 space-y-6">
      <h1 className="text-xl font-semibold text-gray-800 leading-tight">
        {currentQuestion?.question}
      </h1>
      <div className="space-y-4">
        {currentQuestion?.options.map((option, index) => (
          <button
            key={index}
            className={`block w-full text-left px-6 py-3 rounded-lg text-gray-700 bg-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition ease-in-out duration-300 ${
              showAnswer
                ? option === currentQuestion.answer
                  ? "ring-2 ring-green-300 bg-green-50"
                  : selectedOption === option
                  ? "ring-2 ring-red-300 bg-red-50"
                  : "hover:ring-1 hover:ring-gray-200"
                : "hover:ring-1 hover:ring-gray-200"
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && selectedOption === currentQuestion?.answer && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg flex gap-3">
          <svg
            className="w-6 h-6 text-green-700 dark:text-green-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="text-md font-medium text-green-700">回答正确</span>
        </div>
      )}
      {showAnswer && selectedOption !== currentQuestion?.answer && (
        <>
          <div className="mt-4 p-4 bg-red-50 rounded-lg flex gap-3">
            <svg
              className="w-6 h-6 text-red-700 dark:text-red-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="text-md font-medium text-red-700">回答错误</span>
          </div>
          {/* <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <span className="text-md font-medium text-blue-700">参考答案:</span>
            <span className="text-md font-medium text-gray-800">
              {" "}
              {currentQuestion?.answer}
            </span>
          </div> */}
        </>
      )}
      {showAnswer && currentQuestion?.explanation && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg text-gray-700">
          答案解析: {currentQuestion?.explanation}
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={loadNewQuestion}
          className="w-full text-md p-3 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition ease-in-out duration-300"
        >
          下一个问题
        </button>
      </div>
    </div>
  );
}

export default App;
