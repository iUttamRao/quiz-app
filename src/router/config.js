import { createBrowserRouter } from "react-router-dom";
import { DEFAULT, QUIZ, RESULT } from "./keys";
import { Quiz, Result, SetQuiz } from "../pages";

const router = createBrowserRouter([
    {
        path: DEFAULT,
        element: <SetQuiz />,
    },
    {
        path: QUIZ,
        element: <Quiz/>,
    },
    {
        path: RESULT,
        element: <Result />
    }
])

export default router;