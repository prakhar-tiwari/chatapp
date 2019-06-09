import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';
import {setCurrentUser} from './actions/authAction';
import jwtDecode from 'jwt-decode';

const rootReducers=combineReducers({
    auth:authReducer,
    chat:chatReducer
})

const middleWare=[thunk];

const initialState={}

const store=createStore(
    rootReducers,
    initialState,
    compose(
        applyMiddleware(...middleWare),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

const app=(
    <Provider store={store}>
        <App />
    </Provider>
)

if(localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    const decodedToken=jwtDecode(token);
    store.dispatch(setCurrentUser(decodedToken));
}

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
