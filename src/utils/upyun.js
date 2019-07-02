import axios from 'axios'
import {
  md5
} from 'vux'

let upyun = {}
upyun.url = 'https://jjy-sqt-img-www.joojee.cn'
upyun.dir_root = '/syhd2/'
upyun.bucket_name = 'jjy-sqt-img-www'
upyun.operator_name = 'jjy87338828'
upyun.operator_pwd = 'jjy87338828'
upyun.acc_point = 'https://v0.api.upyun.com/'

upyun.sign = (date, file) => {
  return md5(
    'PUT&/' +
    encodeURI(upyun.bucket_name + upyun.dir_root + file.name) +
    '&' +
    date +
    '&' +
    file.size +
    '&' +
    md5(upyun.operator_pwd)
  )
}

upyun.upload = (file, onprogress, success, error) => {
  if (file == undefined) {
    return
  }
  let date = new Date().toUTCString(),
    sign = upyun.sign(date, file),
    xhr = new XMLHttpRequest()
  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      onprogress(Math.round((event.loaded * 100) / event.total))
    }
  }
  xhr.onload = function (event) {
    if (xhr.status == 200) {
      success(upyun.url + upyun.dir_root + file.name)
    } else {
      error('上传失败,代码:' + JSON.parse(xhr.responseText).code)
    }
  }
  xhr.open('PUT', upyun.acc_point + encodeURI(upyun.bucket_name + upyun.dir_root + file.name), true)
  xhr.setRequestHeader('Authorization', 'UpYun ' + upyun.operator_name + ':' + sign)
  xhr.setRequestHeader('X-Date', date)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(file)
}

export default upyun
