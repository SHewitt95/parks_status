import { SearchProps } from "./types";
import { Actions } from "../../state_management";

export default ({ searchQuery, dispatch }: SearchProps) => {
  console.log({ searchQuery });
  return (
    <input
      type="search"
      name=""
      id=""
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
