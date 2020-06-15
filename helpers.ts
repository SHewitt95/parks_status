import { useEffect, useState } from "react";
import axios from "axios";
import { Item, FormattedData, Status, Statuses, FormattedItem } from "./types";
import { Actions } from "./state_management";

export const formatData = (data: Item[]): FormattedData => {
  const formattedData: FormattedData = {};

  const getStatus = (item: Item): Status => {
    const { title, description, internal_link } = item;
    return { internal_link, title, description };
  };

  const getStatusesObject = (): Statuses => ({ 1: [], 2: [], 3: [], 4: [] });

  data.forEach((item: Item) => {
    const datum: FormattedItem = formattedData[item.site_code];
    if (datum) {
      datum.statuses[item.category_id].push(getStatus(item));
    } else {
      const {
        park_name,
        state_code,
        state_name,
        site_code,
        category_id,
      } = item;
      const site: FormattedItem = {
        park_name,
        state_code,
        state_name,
        site_code,
        statuses: getStatusesObject(),
      };

      site.statuses[category_id].push(getStatus(item));
      formattedData[site_code] = site;
    }
  });

  return formattedData;
};

export function useData() {
  const [parkData, setParkData] = useState({});
  const endpoint: string = "https://www.nps.gov/nps-alerts.json";

  useEffect(() => {
    (async function () {
      const data = await axios.get(endpoint);
      setParkData(formatData(data.data));
    })();
  }, []);

  return parkData;
}
