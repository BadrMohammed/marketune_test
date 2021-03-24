import {
  CLEAR_STATE,
  UPDATE_USER_PROPS,
  MERGE_USER_PROPS,
  DELETE_USER_PROPS,
} from "../Actions/types";
import * as general from "./methods";

const INITIAL_STATE = {
  dataList: {
    items: null,
    allItems: null,
    isLoading: false,
    isSearch: false,
    searchForm: { createdAt: "", errorMessage: "" },
  },
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER_PROPS: {
      return general.updateProps(state, action);
    }
    case MERGE_USER_PROPS: {
      return general.mergeProps(state, action);
    }
    case DELETE_USER_PROPS: {
      return general.deleteProps(state, action);
    }
    case CLEAR_STATE: {
      let newState = state;
      newState = INITIAL_STATE;
      return newState;
    }

    default:
      return state;
  }
};
