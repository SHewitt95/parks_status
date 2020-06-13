import { Actions, Types } from "./";

export default (state: Types.State, action: Types.Action) => {
  switch (action.type) {
    case Actions.UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.query,
      };

    case Actions.INITIALIZE_STATE:
      return {
        ...state,
        loading: false,
        data: action.payload.state,
      };

    default:
      return state;
  }
};
