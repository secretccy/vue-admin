export default {
  GET_ORDER(state, action) {
    state.orderList = action.data.content;
    state.pageSum = action.data.totalPages;
    state.loading.val = false;
  },
  GET_CONSIGN(state, action) {
    state.consignList = action.data.content;
    state.pageSum = action.data.totalPages;
    state.loading.val = false;
  }
};
