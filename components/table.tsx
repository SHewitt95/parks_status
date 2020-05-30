import { FormattedData } from "../types";

export default ({ data }: FormattedData) => (
  <>
    <h2>
      {data.park_name} - {data.state_name}
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
          {Object.entries(data.statuses).map((entry, idx) => {
            const [, statusArray] = entry;
            return <td key={idx}>{statusArray.length}</td>;
          })}
        </tr>
      </tbody>
    </table>
  </>
);
