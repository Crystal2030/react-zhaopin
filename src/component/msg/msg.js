import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

@connect(
    state => state
)
class Msg extends React.Component {

    getLast(arr) {
        return arr[arr.length - 1];
    }

    render() {

        const Item = List.Item;
        const Brief = List.Item.Brief;
        const userId = this.props.user._id; // 当前登录用户的id
        const userInfo = this.props.chat.users;
        // console.log('Msg---->', this.props.chat.chatmsg);
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        // console.log('msgGroup--->', msgGroup);
        // console.log(Object.values({name: 'crystal', age: 18}))
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;
        });
        // console.log([3,1,2,6,4].sort(function(a,b) {
        //     return a-b;
        // }))

        console.log('chatList--->', chatList);
        // 按照聊天用户分组， 根据chatid
        // 1. esling代码校验工具
        // 2. react16特有的错误处理机制
        // 3. react性能优化

        return (
            <div>
                {chatList.map(v => { // 取最后一条聊天信息即可
                    const lastItem = this.getLast(v);
                    const targetId = v[0].from === userId ? v[0].to : v[0].from;
                    const unreadNum = v.filter(v=>!v.read&&v.to === userId);
                    if (!userInfo[targetId]) {
                        return null;
                    }
                    // const name = userInfo[targetId] ? userInfo[targetId].name : '';
                    // const avatar = userInfo[targetId] ? userInfo[targetId].avatar : '';
                    <List key={lastItem._id}>
                        <Item
                            extra={<Badge text={unreadNum}></Badge>}
                            thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                            arrow='horizontal'
                            onClick={() => {
                                this.props.history.push(`/chat/${targetId}`)
                            }}
                        >
                            {lastItem.content}
                            <Brief>{userInfo[targetId].name}</Brief>
                        </Item>
                    </List>

                })}
            </div>
        )
    }
}

export default Msg;