const ADD = 'add';
const REDUCE = 'reduce';

// 1. 新建store
// 通过reducer建立   reducer
// 根据老的state和action生成新的state
export function counter(state=10, action) {
    switch(action.type) {
        case ADD:
            return state +1;
        case REDUCE:
            return state-1;
        default: return 10;
    }
}



// 2. 派发事件 传递action
/*store.dispatch({type: 'add'});
store.dispatch({type: 'add'});
store.dispatch({type: 'reduce'});*/

// action creator
export function addGun() {
    return {type: ADD};
}

export function removeGun() {
    return {type: REDUCE};
}

export function addGunAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun());
        }, 2000)
    }
}