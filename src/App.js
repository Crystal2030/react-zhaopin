import React from 'react';
// import {add} from './index.redux';

class App extends React.Component {
   /* constructor(props) {
        super(props);
    }*/

    render() {
        const store = this.props.store;
        const num = store.getState();
        const addGun = this.props.addGun;
        const removeGun = this.props.removeGun;
        return (
           <div>
               <h1>现在有机枪{num}</h1>
               <button onClick={() => store.dispatch(addGun())}>申请机枪</button>
               <button onClick={() => store.dispatch(removeGun())}>上交机枪</button>
           </div>
        )
    }
}

export default  App;