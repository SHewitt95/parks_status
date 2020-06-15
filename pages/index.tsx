import { useReducer, useEffect } from "react";
import axios from "axios";
import { Props } from "../types";
import { formatData, useData } from "../helpers";
import { Table, Search } from "../components";
import { Reducer, State, Actions } from "../state_management";

const endpoint: string = "https://www.nps.gov/nps-alerts.json";

export default (props: Props) => {
  const [state, dispatch] = useReducer(Reducer, State);
  const data = useData();

  useEffect(() => {
    dispatch({
      type: Actions.INITIALIZE_STATE,
      payload: { data },
    });
  }, []);

  return (
    <>
      <Search
        dispatch={dispatch}
        searchQuery={state.searchQuery}
        loading={state.loading}
      />
      {Object.entries(formatData(props.data))
        .filter(([, parkInfo]) => {
          const name = parkInfo.park_name.toLowerCase();
          const lowerQ = state.searchQuery.toLowerCase();
          let valid = true;

          for (let i = 0; i < state.searchQuery.length; i++) {
            if (name[i] !== lowerQ[i]) {
              valid = false;
              break;
            }
          }

          return valid;
        })
        .map(([, formattedData], idx) => (
          <div key={idx}>
            <Table data={formattedData} />
          </div>
        ))}
    </>
  );
};

export async function getServerSideProps() {
  const data = await axios.get(endpoint);
  return {
    props: {
      data: data.data,
    },
  };
}
