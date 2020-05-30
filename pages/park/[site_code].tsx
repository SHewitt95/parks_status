import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { formatData } from "../../helpers";
import { FormattedItem, Status, ParkPageProps } from "../../types";

const CATEGORIES: { [index: string]: string } = {
  1: "Danger",
  2: "Closure",
  3: "Caution",
  4: "Information",
};

export default ({ parkData }: ParkPageProps) => {
  const { park_name, state_name, statuses }: FormattedItem = parkData;
  return (
    <>
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
                  <h4>{status.title}</h4>
                  <p>{status.description}</p>
                  <a target="_blank" href={status.internal_link}>
                    More Information
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

const endpoint: string = "https://www.nps.gov/nps-alerts.json";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await axios.get(endpoint);
  // @ts-ignore
  const { site_code } = params;

  const parkData = formatData(data.data)[site_code];
  return {
    props: {
      parkData,
    },
  };
};
