import Link from "next/link";
import styles from "./parkPage.module.scss";
import { FormattedItem, Status, ParkPageProps } from "../types";

const CATEGORIES: { [index: string]: string } = {
  1: "Danger",
  2: "Closure",
  3: "Caution",
  4: "Information",
};

const getUrl = (url: string): string => {
  const root = "https://www.nps.gov";
  if (url.includes(root)) {
    return url;
  } else {
    return `${root}${url}`;
  }
};

export default ({ parkData }: ParkPageProps) => {
  const {
    park_name,
    state_name,
    statuses,
    site_code,
  }: FormattedItem = parkData;
  return (
    <>
      <Link href={`/#${site_code}`}>
        <a>Go Back Home...</a>
      </Link>

      <h2
        className={styles.heading}
        dangerouslySetInnerHTML={{ __html: park_name }}
      />
      <p className={styles.subheading}>{state_name}</p>
      {Object.entries(statuses).map(([categoryID, statusArray], idx) => {
        if (statusArray.length === 0) return null;
        return (
          <div key={idx}>
            <h3 className={styles.category}>{CATEGORIES[categoryID]}</h3>
            <ul className={styles.list}>
              {statusArray.map((status: Status, idx2: number) => (
                <li className={styles.listItem} key={idx2}>
                  {status.title && (
                    <h4 className={styles.title}>{status.title}</h4>
                  )}
                  {status.description && (
                    <p className={styles.desc}>{status.description}</p>
                  )}
                  {status.internal_link && (
                    <a
                      className={styles.link}
                      target="_blank"
                      href={getUrl(status.internal_link)}
                    >
                      Click to find more details.
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};
