import {
    SET_MAIN_HUE,
    SET_MAIN_SATURATION,
    SET_MAIN_LIGHTNESS,
    SET_SECONDARY_HUE,
    SET_SECONDARY_SATURATION,
    SET_SECONDARY_LIGHTNESS,
} from "./appActions";

const initialState = {
    mainHue: 208,
    mainSaturation: 0,
    mainLightness: 13,
    secondaryHue: 277,
    secondarySaturation: 100,
    secondaryLightness: 60,
    // secondaryHue: 214,
    // secondarySaturation: 61,
    // secondaryLightness: 45,
    // textColor: "#424242"
    textColor: "#F7F9EF"
}

function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MAIN_HUE:
            return { ...state, mainHue: action.payload }
        case SET_MAIN_SATURATION:
            return { ...state, mainSaturation: action.payload }
        case SET_MAIN_LIGHTNESS:
            return { ...state, mainLightness: action.payload }
        case SET_SECONDARY_HUE:
            return { ...state, secondaryHue: action.payload }
        case SET_SECONDARY_SATURATION:
            return { ...state, secondarySaturation: action.payload }
        case SET_SECONDARY_LIGHTNESS:
            return { ...state, secondaryLightness: action.payload }
        default:
            return {...state};
    }
}

export default appReducer;