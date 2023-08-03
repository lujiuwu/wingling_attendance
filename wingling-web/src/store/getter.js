const getters = {
    token: state => state.user.token,
    realname: state => state.user.info.realname,
    avatar: state => state.user.info.avatar,
    userId: state => state.user.info._id
}

export default getters;