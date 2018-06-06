// boss首页
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)

class Boss extends Component { 
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace/>
        {
          this.props.userlist.map(v => (
            // 如果没有图片证明美誉完善信息
            v.avatar ? (
              <Card key={v._id}>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Body>
                  {
                    v.desc.split('\n').map(v => (
                      <div key={v}>{v}</div>
                    ))
                  }
                </Body>
              </Card>
            ) : null
          ))
        }
      </WingBlank>
    )
  }
}

export default Boss
