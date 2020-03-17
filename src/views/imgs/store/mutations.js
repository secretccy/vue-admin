export default {
  GET_IMG(state, action) {
    console.log('action: ', action);
    state.imgList = action.data.content;
    state.loading.val = false;
    state.pageSum = action.data.totalPages;
  }
};
