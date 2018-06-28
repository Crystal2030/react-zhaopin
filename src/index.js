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
// import {counter, addGun, removeGun, addGunAsync} from './index.redux';
// import {counter} from './index.redux';
// 多个reducers 需要合并reducer
import reducers from './reducer';
import Auth from './Auth';
import Dashboard from './Dashboard';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=> f
    ));

console.log('初始的state---->', store.getState())

/*class Test extends React.Component{
    render() {
        console.log('----test---', this.props);
        return <h2>测试组件{this.props.match.params.location}</h2>
    }
}*/
/*
登录
    没有登录信息 同意跳转倒login
页面  导航+显示+注销
    一营
    二营
    骑兵连
React+Redux
*/
// 使用react-redux就可以不用subscribe
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    {/*Switch只渲染命中的第一个Route*/}
                    <Route path='/login' exact component={Auth}></Route>
                    <Route path='/dashboard' component={Dashboard}></Route>
                    <Redirect to='/dashboard'></Redirect>
                </Switch>
               {/* <ul>
                    <li><Link to='/'>一营</Link></li>
                    <li><Link to='/erying'>二营</Link></li>
                    <li><Link to='/qibinglian'>骑兵连</Link></li>
                </ul>*/}
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));



/*function render() {
    ReactDOM.render(
        <App store={store}
             addGun={addGun}
             removeGun={removeGun}
             addGunAsync={addGunAsync}
        />, document.getElementById('root'));
}

render();

// 状态改变之后手动执行一下render
store.subscribe(render);*/

