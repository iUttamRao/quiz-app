import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { answerQuestion, calculateScore, nextQuestion } from '../../redux/reducer/quizReducer';
import { RESULT } from '../../router/keys';

const QuizPage = () => {
  const questions = useSelector((state) => state.quiz.questions);
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const userAnswers = useSelector((state) => state.quiz.userAnswers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  const [selectedOption, setSelectedOption] = useState('');

  const handleAnswer = () => {
    if (selectedOption !== '') {
      dispatch(answerQuestion({ questionIndex: currentQuestionIndex, selectedAnswer: selectedOption }));
      setSelectedOption('');
      dispatch(nextQuestion());
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== '') {
      dispatch(answerQuestion({ questionIndex: currentQuestionIndex, selectedAnswer: selectedOption }));
      dispatch(calculateScore());
      navigate(RESULT);
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      {currentQuestionIndex < questions.length && (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.question}</p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="options"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleAnswer}>Next</button>
        </div>
      )}
      {currentQuestionIndex === questions.length && (
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
