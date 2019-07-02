import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
Vue.use(Router)

import tools from '@/utils/tools'

import Home from '@/views/home/index'

const router = new Router({
  mode: 'history',
  base: '/swwd/',
  routes: [{
    path: '/',
    name: 'home',
    meta: {
      index: 1,
      title: 'vue模板',
    },
    component: Home
  }]
})

router.beforeEach(async (to, from, next) => {
  //获取路由元信息
  let meta = to.meta
  //设置标题头
  document.title = meta.title

  let _to = to.fullPath
  //当从oauth重定向回应用，获取code值，携带code值跳转到当初离开的页面
  if (_to.includes('code')) {
    let searchDic = querystring.parse(location.search)
    let _code = searchDic.code
    let _path = from.path
    //获取授权之前的路径
    let _currentPath = tools.loadFromLocal('currentPath')
    tools.removeFromLocal('currentPath')
    //重定向到授权之前的路径
    if (_path == '/' && !tools.isEmpty(_currentPath)) {
      next({
        path: _currentPath,
        query: {
          code: _code
        }
      })
    }
  }
  next()
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})
export default router
