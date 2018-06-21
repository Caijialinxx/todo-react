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
  user.signUp().then((loginedUser) => {
    let user = {
      id: loginedUser.id,
      email: loginedUser.attributes.email,
      emailVerified: loginedUser.attributes.emailVerified,
      username: loginedUser.attributes.username
    }
    successFn.call(undefined, user)
  }, (error) => {
    errorFn.call(undefined, error)
  })
}

export function logIn(email, password, successFn, errorFn) {
  AV.User.logIn(email, password).then((loggedInUser) => {
    let user = {
      id: loggedInUser.id,
      email: loggedInUser.attributes.email,
      emailVerified: loggedInUser.attributes.emailVerified,
      username: loggedInUser.attributes.username
    }
    successFn.call(undefined, user)
  }, (error) => {
    errorFn.call(undefined, error)
  })
}