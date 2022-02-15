export const initialState = {
    password: "",
    name: "",
    role: "",
}

export const areasState = {
    loading: true,
    loaded: false,
    areas:[{'area':''}],
    error: false,
    errorMsg: false,
    area:''
}

export const questionsState = {
    loading: true,
    loaded: false,
    questions:[{'area':''}],
    error: false,
    errorMsg: false,
    counterQuestions: 0,
    result: 0,
    correct: false,
    wrong: false,
    endGame: false,
}