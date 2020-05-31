import axios from "axios";
import { GetServerSideProps } from "next";
import { formatData } from "../../helpers";
import { ParkPageProps } from "../../types";
import { ParkPage } from "../../components";

export default (props: ParkPageProps) => <ParkPage {...props} />;

const endpoint: string = "https://www.nps.gov/nps-alerts.json";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const data = await axios.get(endpoint);
  // @ts-ignore
  const { site_code } = params;

  const parkData = formatData(data.data)[site_code] || null;
  const err = parkData ? null : { status: 404 };

  if (res && err) {
    res.writeHead(301, {
      Location: "/",
    });
    res.end();
  }

  return {
    props: {
      parkData,
    },
  };
};
