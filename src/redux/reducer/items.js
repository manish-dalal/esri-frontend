import ActionTypes from "../constants/ActionTypes";
import get from "lodash/get";

const LIMIT_DEFAULT = 10;
const initialState = {
  items: [],
  itemsApiInProgress: false,
  totalItemCount: 0,
  filters: {
    search: "",
    sort: "",
    order: "",
    region: "",
    limit: LIMIT_DEFAULT,
    skip: 0
  }
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ITEMS:
      return Object.assign({}, state, {
        itemsApiInProgress: true
      });
    case ActionTypes.GET_ITEMS_FAILURE:
      return Object.assign({}, state, {
        itemsApiInProgress: false
      });
    case ActionTypes.GET_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        items: [...get(action, "payload.content", [])],
        totalItemCount: get(action, "payload.totalElements", 0),
        itemsApiInProgress: false
        // filters: {
        //   ...state.filters,
        //   skip: state.filters.skip + state.filters.limit
        // }
      });
    case ActionTypes.CLEAR_ITEMS_LIST:
      return Object.assign({}, state, {
        items: []
      });
    case ActionTypes.ITEMS_FILTER_CHANGE: {
      return Object.assign({}, state, {
        filters: { ...state.filters, ...action.payload }
      });
    }
    default:
      return state;
  }
};

export default itemsReducer;
