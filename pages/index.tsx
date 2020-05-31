import axios from "axios";
import { Props } from "../types";
import { formatData } from "../helpers";
import { Table } from "../components";

export default (props: Props) => (
  <>
    {Object.entries(formatData(props.data)).map(([, formattedData], idx) => (
      <div key={idx}>
        <Table data={formattedData} />
      </div>
    ))}
  </>
);

const endpoint: string = "https://www.nps.gov/nps-alerts.json";

export async function getServerSideProps() {
  const data = await axios.get(endpoint);
  return {
    props: {
      data: data.data,
    },
  };
}
