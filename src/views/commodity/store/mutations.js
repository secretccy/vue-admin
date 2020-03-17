export default {
  GET_COMMODITY(state, action) {
    state.commodityList = action.data.content;
    state.pageSum = action.data.totalPages;
    state.loading = false;
  },
  GET_DETAIL(state, action) {
    state.baseInfo = action.data;
  
  }
};
