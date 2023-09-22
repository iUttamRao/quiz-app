const { createSlice } = require("@reduxjs/toolkit")

const initialState ={
    questions:[],
    currentQuestionIndex:0,
    userAnswers:[],
    score:0,
}

const quizReducer = createSlice({
    name:'quiz',
    initialState,
    reducers:{
        setQuestions : (state,action) => {
            state.questions= action.payload
        },
        answerQuestion:(state,action) => {
            const {questionIndex,selectedAnswer} = action.payload;
            state.userAnswers[questionIndex] = selectedAnswer;
        },
        nextQuestion: (state) => {
            state.currentQuestionIndex += 1;
          },
        calculateScore:(state) =>{
            state.score = state.userAnswers.filter((userAnswer, index) => userAnswer === state.questions[index].correctAnswer).length;
        }
    }
})

export default quizReducer.reducer;
export const {setQuestions,answerQuestion,nextQuestion,calculateScore} = quizReducer.actions;