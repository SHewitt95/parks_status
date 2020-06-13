import { SearchProps } from "./types";
import { Actions } from "../../state_management";

export default ({ searchQuery, dispatch, loading }: SearchProps) => {
  console.log({ searchQuery });
  return (
    <input
      type="search"
      name=""
      id=""
      disabled={loading}
      value={searchQuery}
      onChange={(e) => {
        dispatch({
          type: Actions.UPDATE_SEARCH_QUERY,
          payload: { query: e.target.value },
        });
      }}
    />
  );
};
