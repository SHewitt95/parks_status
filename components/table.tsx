import Link from "next/link";
import styles from "./table.module.scss";
import { FormattedData } from "../types";

export default ({ data }: FormattedData) => (
  <>
    <Link href={`/park/[site_code]`} as={`/park/${data.site_code}`}>
      <a className={styles.link}>
        <h2
          className={styles.heading}
          dangerouslySetInnerHTML={{ __html: data.park_name }}
          id={data.site_code}
        />
        <p className={styles.subheading}>{data.state_name}</p>
      </a>
    </Link>

    <table className={styles.table}>
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
