import AV from 'leancloud-storage';

let APP_ID = '4Sd2Vkpni8g9EB3wVuTzFAvt-gzGzoHsz'
let APP_KEY = 'YyPdXBvVa8Vj9k4lwRA7JdcL'
AV.init({ appId: APP_ID, appKey: APP_KEY })

export default AV

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
      case 125:
        alert('无效的电子邮箱地址！请检查！')
        break;
      case 203:
        alert('电子邮箱地址已被占用！')
        break;
      case 218:
        alert('密码无效，不允许空白密码！请重设！')
        break;
      default:
        alert(error)
        break;
    }
    errorFn.call(undefined, error)
  })
}

export function logIn(email, password, successFn, errorFn) {
  AV.User.logIn(email, password).then((loggedInUser) => {
    let user = getUserInfo(loggedInUser)
    successFn.call(undefined, user)
  }, (error) => {
    switch (error.code) {
      case 210:
        alert('账号或密码错误！请检查！')
        break;
      case 211:
        alert('账号不存在！如果未注册请先注册。')
        break;
      case 216:
        alert('电子邮箱未通过验证！请先验证再登录。')
        break;
      case 219:
        alert('登录失败次数超过限制，请稍候再试！或者通过忘记密码重设密码。')
        break;
      default:
        alert(error)
        break;
    }
    errorFn.call(undefined, error)
  })
}

export function getCurrentUser() {
  let user = AV.User.current()
  console.log(user)
  if (user) {
    return getUserInfo(user)
  } else {
    return null
  }
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