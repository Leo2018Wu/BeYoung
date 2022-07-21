const initialState = {
  GirlsFilterFlag: false, // 女生筛选条件弹窗
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Girl_FILTER_FLAG':
      const {GirlsFilterFlag} = action;
      return Object.assign({...state}, {GirlsFilterFlag});
    default:
      return state;
  }
};
