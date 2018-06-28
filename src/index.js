import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux'; // 使用applyMiddleware开启thunk中间件
import thunk from 'redux-thunk';
import {counter, addGun, removeGun, addGunAsync} from './index.redux';

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=> f
    ));

function render() {
    ReactDOM.render(
        <App store={store}
             addGun={addGun}
             removeGun={removeGun}
             addGunAsync={addGunAsync}
        />, document.getElementById('root'));
}

render();

// 状态改变之后手动执行一下render
store.subscribe(render);

