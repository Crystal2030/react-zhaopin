import React from 'react';
import {addGun, removeGun, addGunAsync} from './index.redux';
import {connect} from 'react-redux';

/*
 * Connect负责从外部获取组件需要的参数
 * Connect可以用装饰器的方式来写
 *
 *
 * connect有两个参数，传入两个参数后，这样react-redux会自动把这些参数放到props里面去
 */
// App需要的属性
// const mapStatetoProps = (state) => {
//     return {num: state};
// }
// App需要的方法的集合
// const actionCreators = {addGun, removeGun, addGunAsync};

// // connect包裹App
// App = connect(mapStatetoProps, actionCreators)(App);

//装饰器模式
@connect(
    // 你要state什么属性放到props里面
    state => ({num: state.counter}),
    // 你要的方法，放到props里面，自动dispatch
    {addGun, removeGun, addGunAsync}
)


class App extends React.Component {
   /* constructor(props) {
        super(props);
    }*/

    render() {
        // const store = this.props.store;
        // const num = store.getState();
        return (
           <div>
               <h1>现在有机枪{this.props.num}</h1>
               {/*<button onClick={() => store.dispatch(addGun())}>申请机枪</button>*/}
               {/*<button onClick={() => store.dispatch(removeGun())}>上交机枪</button>*/}
               {/*<button onClick={() => store.dispatch(addGunAsync())}>拖两天再上交机枪</button>*/}

               {/*num addGun removeGun addGunAsync都是connect给的，不需要手动dispatch，自动有了dispatch了*/}
               <button onClick={this.props.addGun}>申请机枪</button>
               <button onClick={this.props.removeGun}>上交机枪</button>
               <button onClick={this.props.addGunAsync}>拖两天再上交机枪</button>
           </div>
        )
    }
}


export default  App;