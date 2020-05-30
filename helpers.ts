import { Item, FormattedData, Status, Statuses, FormattedItem } from "./types";

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
        statuses: getStatusesObject(),
      };

      site.statuses[category_id].push(getStatus(item));
      formattedData[site_code] = site;
    }
  });

  return formattedData;
};
