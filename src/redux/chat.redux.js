// 聊天内容的redux
import axios from 'axios'
import io from 'socket.io-client'
import { stat } from 'fs';
// 由于我们跨域，后端是9093前端是3000，这里需要链接下
const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取消息
const MSG_RECV = 'MSG_RECV'
// 标识消息
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0 // 未读消息数量
}

export function chat(state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload,
        unread: action.payload.filter(v => !v.read).length
      }
    case MSG_RECV:
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload]
      }
    // case MSG_READ:
    default:
      return state
  }
}

function msgList(msgs) {
  return { type: 'MSG_LIST', payload: msgs }
}

function msgRecv(msg) {
  return { type: 'MSG_RECV', payload: msg }
}
// 获取聊天信息
export function getMsgList() {
  return dispatch => {
    axios.get('/user/getmsglist').then(res => {
      if (res.state === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs))
      }
    })
  }
}

// 发送聊天信息到后端
export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

// 监听聊天信息
export function recvMsg() {
  return dispatch => {
    socket.on('recvmsg', function(data) {
      console.log('recvmsg', data)
      dispatch(msgRecv(data))
    })
  }
}