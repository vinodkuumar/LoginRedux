import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import usersReducer from './store/reducers/users';

import RootNavigator from './navigation/RootNavigator';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default function App(){
  return(
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  )
}