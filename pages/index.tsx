import axios from "axios";
import { Props, Item, FormattedData, Status } from "../types";
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
              <td>{"Category"}</td>
              <td>{"Title"}</td>
              <td>{"Description"}</td>
              <td></td>
            </thead>
            <tbody>
              {formattedData.statuses.map((status: Status, idx: number) => (
                <tr key={idx}>
                  <td>{status.category}</td>
                  <td>{status.title}</td>
                  <td>{status.description}</td>
                  <td>
                    <a href={status.internal_link}>More information</a>
                  </td>
                </tr>
              ))}
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
