import AV from 'leancloud-storage';

let APP_ID = '4Sd2Vkpni8g9EB3wVuTzFAvt-gzGzoHsz'
let APP_KEY = 'YyPdXBvVa8Vj9k4lwRA7JdcL'
AV.init({ appId: APP_ID, appKey: APP_KEY })

export function signUp(email, password, successFn, errorFn) {
  let user = new AV.User()
  user.setUsername(email)
  user.setEmail(email)
  user.setPassword(password)
  user.signUp().then((loggedInUser) => {
    let user = getUserInfo(loggedInUser)
    successFn.call(undefined, user)
  }, (error) => {
    switch (error.code) {
      case -1:
        errorFn.call(undefined, '请求被终止，请检查网络是否正确连接！')
        return;
      case 125:
        errorFn.call(undefined, '无效的电子邮箱地址！请检查！')
        return;
      case 203:
        errorFn.call(undefined, '电子邮箱地址已被占用！请更换！')
        return;
      case 218:
        errorFn.call(undefined, '密码无效，不允许空白密码！请重设！')
        return;
      default:
        errorFn.call(undefined, error)
        return;
    }
  })
}

export function logIn(email, password, successFn, errorFn) {
  AV.User.logIn(email, password).then((loggedInUser) => {
    let user = getUserInfo(loggedInUser)
    successFn.call(undefined, user)
  }, (error) => {
    switch (error.code) {
      case -1:
        errorFn.call(undefined, '请求被终止，请检查网络是否正确连接！')
        return;
      case 210:
        errorFn.call(undefined, '账号或密码错误！请检查！')
        return;
      case 211:
        errorFn.call(undefined, '账号不存在！如果未注册请先注册。')
        return;
      case 216:
        errorFn.call(undefined, '电子邮箱未通过验证！请先验证再登录。')
        return;
      case 219:
        errorFn.call(undefined, '登录失败次数超过限制，请稍候再试！或者通过忘记密码重设密码。')
        return;
      default:
        errorFn.call(undefined, error)
        return;
    }
  })
}

export function reset(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(() => {
    successFn.call(undefined)
  }, (error) => {
    switch (error.code) {
      case -1:
        errorFn.call(undefined, '请求被终止，请检查网络是否正确连接！')
        return;
      case 204:
        errorFn.call(undefined, '请提供注册时的电子邮箱！')
        return;
      case 205:
        errorFn.call(undefined, '查询不到该电子邮箱，请检查电子邮箱或者重新注册！')
        return;
      case 216:
        errorFn.call(undefined, '电子邮箱未通过验证！请先验证再登录。')
        return;
      case 219:
        errorFn.call(undefined, '登录失败次数超过限制，请稍候再试！或者通过忘记密码重设密码。')
        return;
      default:
        errorFn.call(undefined, error)
        return;
    }
  })
}

export function getCurrentUser() {
  let user = AV.User.current()
  if (user) { return getUserInfo(user) }
  else { return null }
}

export function logOut() {
  AV.User.logOut()
  return null
}

function getUserInfo(AVUser) {
  return {
    id: AVUser.id,
    email: AVUser.attributes.email,
    emailVerified: AVUser.attributes.emailVerified,
    username: AVUser.attributes.username
  }
}