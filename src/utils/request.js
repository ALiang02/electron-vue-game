import axios from 'axios'
import store from '../store'

const service = axios.create({
  method: 'post',
  baseURL: 'http://127.0.0.1:3000/data/',
  timeout: 5000,
  // transformRequest: data => {
  //   let transData = new URLSearchParams(); // django接收的数据应该为URLSearchParams对象
  //   transData.append("data", JSON.stringify(data)); // 将data对象转换成JSON字符串传输
  //   return transData;
  // },
})

export function RPC(url, data) {
  return new Promise(function (resolve, reject) {
    service({
      url,
      data: {
        room_id: store.state.room.id,
        user_id: store.state.user.id,
        qipan_id: store.state.qipan.id,
        data: data || {},
      },
    })
      .then((res) => {
        if (!res.data.code) {
          resolve(res.data.data)
        } else {
          reject(res.data.message)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
