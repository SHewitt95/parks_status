import axios from "axios";
import { Props, Item, FormattedData } from "../types";

const formatData = (data: Item[]): FormattedData => {
  const formattedData: FormattedData = {};
  const getStatus = (item: Item) => {
    const {
      category_id,
      category,
      internal_link,
      description,
      end_date,
      start_date,
      title,
      unique_id,
    } = item;
    return {
      category_id,
      category,
      internal_link,
      description,
      end_date,
      start_date,
      title,
      unique_id,
    };
  };

  data.forEach((item: Item) => {
    const datum = formattedData[item.site_code];
    // Check if item's site_code is in formattedData
    if (datum) {
      // If so, store the item's status attributes in object
      // append to formattedItem's statuses array
      datum.statuses.push(getStatus(item));
    } else {
      // If item's site_code is NOT in formattedData
      // create object with site_code's attributes
      const { park_name, state_code, state_name, site_code } = item;
      const site = {
        park_name,
        state_code,
        state_name,
        statuses: [getStatus(item)],
      };
      // add object to formattedData, with site_code as the key
      formattedData[site_code] = site;
    }
  });

  return formattedData;
};

export default (props: Props) => {
  console.log({ data: Object.entries(formatData(props.data)) });
  // console.log({ datum2: props.data[1] });
  // console.log({ data: props.data });

  return (
    <ul>
      {Object.entries(formatData(props.data)).map(
        ([, formattedData], idx: number) => (
          <li key={idx}>{formattedData.park_name}</li>
        )
      )}
    </ul>
  );
};

const endpoint: string = "https://www.nps.gov/nps-alerts.json";

export async function getServerSideProps() {
  const data = await axios.get(endpoint);
  return {
    props: {
      data: data.data,
    },
  };
}
