import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux'; // 使用applyMiddleware开启thunk中间件
import thunk from 'redux-thunk';
/**
 * Provider组件在应用最外层，传入store即可，其他参数不用再传入了，只用一次
 * Connect负责从外部获取组件需要的参数
 * Connect可以用装饰器的方式来写
 */
import {Provider} from 'react-redux';
// import {counter, addGun, removeGun, addGunAsync} from './index.redux';
import {counter} from './index.redux';

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=> f
    ));

// 使用react-redux就可以不用subscribe
ReactDOM.render(
    <Provider store={store}>
        <App/>
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

