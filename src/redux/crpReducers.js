import { SET_PERSONAL_WARNINGS, SET_SELF_MANGEMENT_STRATEGIES, SET_REASONS_TO_LIVE, SET_SOCIAL_SUPPORT, SET_PROFESSIONAL_SUPPORT } from "./crpActions";

const initialState = {
    warnings: [],
    strategies: [],
    reasons: [],
    social: [],
    professional: []
}

function crpReducer(state = initialState, action) {
    switch(action.type) {
        case SET_PERSONAL_WARNINGS: 
            return { ...state, warnings: action.payload }
        case SET_SELF_MANGEMENT_STRATEGIES:
            return { ...state, strategies: action.payload }
        case SET_REASONS_TO_LIVE:
            return { ...state, reasons: action.payload }
        case SET_SOCIAL_SUPPORT:
            return { ...state, social: action.payload }
        case SET_PROFESSIONAL_SUPPORT:
            return { ...state, professional: action.payload }
        default:
            return state;
    }   
}

export default crpReducer;