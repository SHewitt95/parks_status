import ErrorPage from "next/error";
import Link from "next/link";
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

export default ({ parkData, err }: ParkPageProps) => {
  if (err) return <ErrorPage statusCode={err.status} />;

  const { park_name, state_name, statuses }: FormattedItem = parkData;
  return (
    <>
      <Link href="/">
        <a>Go Back Home...</a>
      </Link>

      <h2 dangerouslySetInnerHTML={{ __html: park_name }} />
      <p>State: {state_name}</p>
      {Object.entries(statuses).map(([categoryID, statusArray], idx) => {
        if (statusArray.length === 0) return null;
        return (
          <div key={idx}>
            <h3>{CATEGORIES[categoryID]}</h3>
            <ul>
              {statusArray.map((status: Status, idx2: number) => (
                <li key={idx2}>
                  {status.title && <h4>{status.title}</h4>}
                  {status.description && <p>{status.description}</p>}
                  {status.internal_link && (
                    <a target="_blank" href={getUrl(status.internal_link)}>
                      More Information
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
