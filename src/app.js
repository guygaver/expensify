import React from 'react' 
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'
import './firebase/firebase'

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <AppRouter/>
    </Provider>
), document.getElementById('app'));