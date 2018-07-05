import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'; // 使用applyMiddleware开启thunk中间件
import thunk from 'redux-thunk';
/**
 * Provider组件在应用最外层，传入store即可，其他参数不用再传入了，只用一次
 * Connect负责从外部获取组件需要的参数
 * Connect可以用装饰器的方式来写
 */
import {Provider} from 'react-redux';
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';

// 多个reducers 需要合并reducer
import reducers from './reducer';
import './config';
import './index.css';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=> f
    ));

console.log('初始的state---->', store.getState())

function Boss() {
    return <h2>Boss页面</h2>
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/boss' component={Boss}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

