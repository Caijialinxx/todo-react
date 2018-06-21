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
    errorFn.call(undefined, error)
  })
}

export function logIn(email, password, successFn, errorFn) {
  AV.User.logIn(email, password).then((loggedInUser) => {
    let user = getUserInfo(loggedInUser)
    successFn.call(undefined, user)
  }, (error) => {
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

function getUserInfo(AVUser) {
  return {
    id: AVUser.id,
    email: AVUser.attributes.email,
    emailVerified: AVUser.attributes.emailVerified,
    username: AVUser.attributes.username
  }
}