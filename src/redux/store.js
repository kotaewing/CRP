import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import crpReducer from "./crpReducers";
import appReducer from "./appReducers";

const rootReducer = combineReducers({ crp: crpReducer, app: appReducer })

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(Store)