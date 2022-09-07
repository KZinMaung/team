import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { SET_CURRENT_USER } from './store/type';

const user_name = localStorage.getItem("user_name");

if(user_name){
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: {user_name},
  })
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


