import { Actions, Types } from "./";

export default (state: Types.State, action: Types.Action) => {
  switch (action.type) {
    case Actions.UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.query,
      };
    default:
      return state;
  }
};
