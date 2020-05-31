import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import ErrorPage from "next/error";
import { formatData } from "../../helpers";
import { FormattedItem, Status, ParkPageProps } from "../../types";
import { Layout } from "../../components";

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
    <Layout>
      <Link href="/">
        <a>Go Back Home...</a>
      </Link>

      <h2>{park_name}</h2>
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
    </Layout>
  );
};

const endpoint: string = "https://www.nps.gov/nps-alerts.json";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await axios.get(endpoint);
  // @ts-ignore
  const { site_code } = params;

  const parkData = formatData(data.data)[site_code] || null;
  const err = parkData ? null : { status: 404 };
  return {
    props: {
      parkData,
      err,
    },
  };
};
