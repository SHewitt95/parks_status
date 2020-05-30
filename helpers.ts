import { Item, FormattedData } from "./types";

export const formatData = (data: Item[]): FormattedData => {
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
