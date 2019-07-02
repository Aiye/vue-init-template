import Cookies from 'js-cookie'
import net from '@/network/index'

const state = {
  serverAccessToken: '', //服务token
  code: '', // code
  userAccessToken: '', //用户token
  expiresDate: 0, // cookie过期时间
  requests: [], // 所有的请求栈
  loading: false, //页面toast模式
  showPopup: false, //顶部pop模式提示
  popupType: 'info', //pop提示类型  ['success','info','warning','error']
  popupMsg: '' // pop提示内容
}

//暴露getters供获取state的值
const getters = {
  serverAccessToken(state) {
    return state.serverAccessToken || Cookies.get('server_access_token')
  },
  userAccessToken() {
    return state.userAccessToken || Cookies.get('user_access_token')
  },
  token() {
    return (
      Cookies.get('user_access_token') || Cookies.get('server_access_token')
    )
  },
  code() {
    return state.code
  },
  loading(state) {
    return state.loading
  },
  showPopup(state) {
    return state.showPopup
  },
  popupType(state) {
    return state.popupType
  },
  popupMsg(state) {
    return state.popupMsg
  }
}

//state仓库中的数据状态改变操作
const mutations = {
  /**设置服务token */
  setServerAccessToken(state, payload) {
    state.serverAccessToken = payload.token
    //同步存储到cookie中设置token过期时间
    let expiresDate = new Date(new Date().getTime() + payload.expires_in * 1000)
    Cookies.set('server_access_token', payload.token, {
      expires: expiresDate
    })
  },
  /**设置用户token */
  setUserAccessToken(state, payload) {
    state.code = payload.code
    state.userAccessToken = payload.token
    //同步存储到cookie中设置token过期时间
    let expiresDate = new Date(new Date().getTime() + payload.expires_in * 1000)
    state.expiresDate = expiresDate
    Cookies.set('user_access_token', payload.token, {
      expires: expiresDate
    })
  },
  /**请求入栈 */
  pushRequest(state, payload) {
    //如果请求栈里没有这个请求则入栈
    if (!state.requests.includes(payload)) {
      state.requests.push(payload)
    }
    //把加载状态改为是
    state.loading = true
  },
  /**请求出栈 */
  popRequest(state, payload) {
    //如果请求栈中有这个请求则出栈
    if (state.requests.includes(payload)) {
      let index = state.requests.findIndex(item => item == payload)
      state.requests.splice(index, 1)
    }
    //如果请求栈清空了，则把加载状态改为否
    if (state.requests.length == 0) {
      state.loading = false
    }
  },
  /**清空请求栈 */
  clearRequest(state) {
    state.requests = []
    state.loading = false
  },
  /**设置loading效果 */
  setLoading(state, payload) {
    state.loading = payload
  },
  /**显示顶部吐司提示 */
  showPopup(state, payload) {
    state.popupType = payload.type
    state.popupMsg = payload.msg
    state.showPopup = true
  },
  /**影藏顶部吐司提示 */
  hidePopup(state, payload) {
    state.showPopup = payload
  }
}

const actions = {
  showPopupAction: ({
    commit
  }, payload) => {
    commit('showPopup', payload)
    setTimeout(() => {
      commit('hidePopup', false)
    }, payload.time || 1500)
  },
  initToken: async ({
    commit
  }) => {
    await net.getServerToken().then(res => {
      //将获取的token和code放到store中去管理状态
      commit('setServerAccessToken', {
        token: res.data.access_token,
        expires: res.data.expires_in
      })
    })
  },
  initUserLoginStatus: async ({
    dispatch
  }) => {
    new Promise.all([
      await dispatch('initUserToken'), //请求获取token
    ]).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  },
  initUserToken: async ({
    commit,
    getters
  }, code) => {
    await net.getUserToken(getters.code).then(res => {
      let token = res.data.access_token
      //将获取的token和code放到store中去管理状态
      commit('setUserAccessToken', {
        code: code,
        token: token,
        expires: res.data.expires_in
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
