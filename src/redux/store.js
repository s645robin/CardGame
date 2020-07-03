import { createStore } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

import { 
  appReducer
} from './reducer'

const persistedReducer = persistReducer(persistConfig, appReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)

export {
  store,
  persistor
}