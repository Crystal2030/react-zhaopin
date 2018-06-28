import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {counter, addGun, removeGun} from './index.redux';

const store = createStore(counter);

function render() {
    ReactDOM.render(<App store={store} addGun={addGun} removeGun={removeGun}/>, document.getElementById('root'));
}

render();

// 状态改变之后手动执行一下render
store.subscribe(render);

