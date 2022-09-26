const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  userInfo: state => state.user.userInfo,
  userImg: state => state.user.userInfo.image
}
export default getters
