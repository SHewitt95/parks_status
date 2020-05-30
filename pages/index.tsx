import axios from "axios";
import { Props, Status } from "../types";
import { formatData } from "../helpers";

export default (props: Props) => (
  <main>
    {Object.entries(formatData(props.data)).map(
      ([, formattedData], idx: number) => (
        <div key={idx}>
          <h2>
            {formattedData.park_name} - {formattedData.state_name}
          </h2>
          <table>
            <thead>
              <td>Dangers</td>
              <td>Closures</td>
              <td>Cautions</td>
              <td>Information</td>
            </thead>
            <tbody>
              <tr>
                {Object.entries(formattedData.statuses).map((entry, idx) => {
                  const [, statusArray] = entry;
                  return <td key={idx}>{statusArray.length}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )
    )}
  </main>
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
