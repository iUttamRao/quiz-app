import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QUIZ } from '../../router/keys';
import { setQuestions } from '../../redux/reducer/quizReducer';

const QuizSetupPage = () => {
  const [questions, setQuestionsData] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestionsData([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestionsData(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestionsData(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = parseInt(value);
    setQuestionsData(updatedQuestions);
  };

  const handleStartQuiz = () => {
    // Dispatch questions to the Redux store
    dispatch(setQuestions(questions));
    // Redirect to the quiz page
    navigate(QUIZ);
  };

  return (
    <div>
      <h1>Quiz Setup</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
            />
          ))}
          <select
            value={question.correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
          >
            {question.options.map((_, optionIndex) => (
              <option key={optionIndex} value={optionIndex}>
                Option {optionIndex + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizSetupPage;
