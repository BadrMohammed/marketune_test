import { Request } from "../api";
import { UPDATE_USER_PROPS } from "./types";
export const getData = () => (dispatch) => {
  dispatch({
    type: UPDATE_USER_PROPS,
    payload: [{ prop: "dataList.isLoading", value: true }],
  });
  Request()
    .get("/getData")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: UPDATE_USER_PROPS,
          payload: [
            { prop: "dataList.items", value: res.data },
            { prop: "dataList.allItems", value: res.data },
          ],
        });
      }
      dispatch({
        type: UPDATE_USER_PROPS,
        payload: [{ prop: "dataList.isLoading", value: false }],
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_PROPS,
        payload: [{ prop: "dataList.isLoading", value: false }],
      });
      console.log(err);
    })
    .finally();
};
