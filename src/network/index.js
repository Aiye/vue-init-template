import Axios from './axios'
import store from '@/store/index'

const _isPro = process.env.NODE_ENV === 'production'

const REDIRECT_RUL = 'https://api.joojee.cn/swwd'
const WEIXIN_APPID = 'wx3b5e7b0722879169'
const HOST = 'https://statictest.joojee.cn/dky/'

let net = {}

// 微信授权地址
net.redirect_uri_for_code =
  'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
  WEIXIN_APPID +
  '&redirect_uri=' +
  HOST +
  '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'



function accessToken() {
  return store.getters.userAccessToken || store.getters.serviceAccessToken
}

function parameterGetString(json) {
  if (tools.isEmpty(json)) {
    json = {}
  }
  json.access_token = accessToken()
  let parameterString = ''
  let keys = Object.keys(json)
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = json[key]
    if (value != undefined && value != '') {
      parameterString = parameterString + keys[i] + '=' + json[keys[i]] + '&'
    }
  }
  parameterString = parameterString.substr(0, parameterString.length - 1)
  return parameterString
}

function parameterPostJson(json, dontFilter) {
  if (tools.isEmpty(json)) {
    json = {}
  }
  json.access_token = accessToken()
  let keys = Object.keys(json)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = json[key]
    if ((value == undefined || value == '') && dontFilter == false) {
      delete json[key]
    }
  }
  return json
}
export default net
