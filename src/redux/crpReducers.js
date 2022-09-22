import {
    SET_PERSONAL_WARNINGS,
    SET_SELF_MANGEMENT_STRATEGIES,
    SET_REASONS_TO_LIVE,
    SET_SOCIAL_SUPPORT,
    SET_PROFESSIONAL_SUPPORT,
    ADD_DAILY_CHECK
} from "./crpActions";

import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    warnings: [],
    strategies: [],
    reasons: [],
    social: [],
    professional: [],
    dailyChecks: []
}

AsyncStorage.getItem('warnings').then(res => {
    initialState.warnings = JSON.parse(res);
});

AsyncStorage.getItem('strategies').then(res => {
    initialState.strategies = JSON.parse(res);
});

AsyncStorage.getItem('reasons').then(res => {
    initialState.reasons = JSON.parse(res);
});

// AsyncStorage.getItem('social').then(res => {
//     initialState.social = JSON.parse(res);
// });

// AsyncStorage.getItem('professional').then(res => {
//     initialState.professional = JSON.parse(res);
// });

export default function (state = initialState, action) {
    switch (action.type) {
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
        case ADD_DAILY_CHECK:
            return { ...state, dailyChecks: action.payload }
        default:
            return {...state};
    }
}