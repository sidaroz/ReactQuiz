const initState = {
    options: {
      username: ``,
      loading: false,
      question_category: ``,
      question_difficulty: ``,
      question_type: ``,
      amount_of_questions: 10
    }
  }

  const Reducer = (state = initState, action) => {
    switch (action.type) {
      case "CHANGED_LOADING":
        return {
          ...state,
          options: {
            ...state.options,
            loading: action.value
          }
        }
        case"CHANGED_USERNAME":
        return {
          ...state,
          options: {
            ...state.options,
            username: action.value
          }
        }
      case "CHANGED_CATEGORY":
        return {
          ...state,
          options: {
            ...state.options,
            question_category: action.value
          }
        }
      case "CHANGED_DIFFICULTY":
        return {
          ...state,
          options: {
            ...state.options,
            question_difficulty: action.value
          }
        }
      case "CHANGED_TYPE":
        return {
          ...state,
          options: {
            ...state.options,
            question_type: action.value
          }
        }
      
      case "CHANGED_NUMBER":
        return {
          ...state,
          options: {
            ...state.options,
            amount_of_questions: action.value
          }
        }
      default:
        return state
    }
  }
  
  export default Reducer