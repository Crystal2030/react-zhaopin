import React from 'react';
import {Button, List} from 'antd-mobile';

class App extends React.Component {
    render() {
        const boss = '阮经天';
        return (
            <div>
                <h2>hello {boss} </h2>
                <一营 老大='张大大'></一营>
                <骑乒连 老大="陈大大"></骑乒连>
            </div>
        )
    }
}

function 骑乒连(props) {
    return <h2>骑兵连连长{props.老大}, 冲啊！</h2>
}

class 一营 exends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            soldiers: ['虎子', '柱子', '王根生']
        }
        // this找不到解决方案一：
        // this.addSoldier = this.addSoldier.bind(this);
    }
    componentWillMount() {
        console.log('组件马上就要加载了')
    }
    componentDidMount() {
        console.log('组件加载完毕')
    }
    addSoldier() {
        console.log('hello add soldier');
        this.setState({
            soldiers: [...this.state.soldiers, '新兵蛋子' + Math.random()]
        });
    }
    render() {
        console.log('组件正在加载')
        return (
            <div>
                <h2>一营营长, 咱们老大是{this.props.老大}</h2>
                {/*this找不到解决方案一：*/}
                <Button type='primary' onClick={() => this.addSoldier()}>新兵入伍</Button>
                <List renderHeader={() => '士兵列表'}>
                    {
                        this.state.soldiers.map(v => {
                            return (
                                <List.Item key={v}>{v}</List.Item>
                            )
                        })
                    }
                </List>
                <ul>
                    {this.state.soldiers.map(v => {
                        return <li key={v}>{v}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default  App;