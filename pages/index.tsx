import axios from "axios";
import { Props, Item, FormattedData, Status } from "../types";

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
