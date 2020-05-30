import Link from "next/link";
import { FormattedData } from "../types";

export default ({ data }: FormattedData) => (
  <>
    <Link href={`/park/[site_code]`} as={`/park/${data.site_code}`}>
      <a>
        <h2>
          {data.park_name} - {data.state_name}
        </h2>
      </a>
    </Link>

    <table>
      <thead>
        <tr>
          <th>Dangers</th>
          <th>Closures</th>
          <th>Cautions</th>
          <th>Information</th>
        </tr>
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
