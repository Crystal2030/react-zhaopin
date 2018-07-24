import React from 'react';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {connect} from'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

const Header = Card.Header;
const Body = Card.Body;

@connect(
    state=>state.chatUser,
    {getUserList}
)
class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data: []
        }
    }
    componentDidMount() {
        this.props.getUserList('genius');
    }

    render() {
        return (
            <WingBlank>
                {this.state.data.map(v=>(
                   v.avatar ? (<Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        >
                        </Header>
                       <Body>
                       {v.desc.split('\n').map(v => (
                           <div key={v}>{v}</div>
                       ))}
                       </Body>
                    </Card>) : null
                ))}
            </WingBlank>
        );
    }
}

export default Boss;