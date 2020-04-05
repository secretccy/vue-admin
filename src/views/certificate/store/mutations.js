export default {
  GET_CERTIFICATE(state, action) {
    state.certificateList = action.data.content;
    console.log('state.certificateList: ', state.certificateList);

    state.pageSum = action.data.totalPages;
  },
};
