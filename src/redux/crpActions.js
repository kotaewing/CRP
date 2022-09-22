export const SET_PERSONAL_WARNINGS = "SET_PERSONAL_WARNINGS";
export const SET_SELF_MANGEMENT_STRATEGIES = "SET_SELF_MANGEMENT_STRATEGIES";
export const SET_REASONS_TO_LIVE = "SET_REASONS_TO_LIVE";
export const SET_SOCIAL_SUPPORT = "SET_SOCIAL_SUPPORT";
export const SET_PROFESSIONAL_SUPPORT = "SET_PROFESSIONAL_SUPPORT";
export const ADD_DAILY_CHECK = "ADD_DAILY_CHECK";

export const setWarnings = warnings => dispatch => {
    dispatch({
        type: SET_PERSONAL_WARNINGS,
        payload: warnings
    });
};

export const setStrategies = strategies => dispatch => {
    dispatch({
        type: SET_SELF_MANGEMENT_STRATEGIES,
        payload: strategies
    });
};

export const setReasons = reasons => dispatch => {
    dispatch({
        type: SET_REASONS_TO_LIVE,
        payload: reasons
    })
}

export const setSocial = social => dispatch => {
    dispatch({
        type: SET_SOCIAL_SUPPORT,
        payload: social
    })
}

export const setProfessional = professional => dispatch => {
    dispatch({
        type: SET_PROFESSIONAL_SUPPORT,
        payload: professional
    })
}

export const addDailyCheck = dailyCheck => dispatch => {
    dispatch({
        type: ADD_DAILY_CHECK,
        payload: dailyCheck
    })
}