import { useEffect, useReducer } from "react";
import axios from "axios";
import { Props } from "../types";
import { formatData } from "../helpers";
import { Table, Search } from "../components";
import { Reducer, State, Actions } from "../state_management";

const endpoint: string = "https://www.nps.gov/nps-alerts.json";

export default (props: Props) => {
  const [, dispatch] = useReducer(Reducer, State);

  useEffect(() => {
    (async function getData() {
      const data = await axios.get(endpoint);
      dispatch({
        type: Actions.INITIALIZE_STATE,
        payload: { data: formatData(data.data) },
      });
    })();
  }, []);

  return (
    <>
      <Search />
      {Object.entries(formatData(props.data)).map(([, formattedData], idx) => (
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
