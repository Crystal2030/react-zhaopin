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
    Switch
} from 'react-router-dom';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import Dashboard from './component/dashboard/dashboard';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat';

// 多个reducers 需要合并reducer
import reducers from './reducer';
import './config';
import './index.css';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=> f
    ));

console.log('初始的state---->', store.getState())

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

