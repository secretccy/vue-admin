export default {
  GET_USER(state, action) {
    state.userList = action.data.content;
    state.flag.loading = false;
    state.pageSum = action.data.totalPages;
  },
  GET_ATTENTION(state, action) {
    state.list = action.data.attention;
    state.flag.drawer = true;
  },
  GET_FANS(state, action) {
    state.list = action.data.fans;
    state.flag.drawer = true;
  }
};
