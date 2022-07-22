import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import crpReducer from "./crpReducers";

const rootReducer = combineReducers({crpReducer})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(Store)