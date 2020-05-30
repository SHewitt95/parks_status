enum Category {
  Danger = 1,
  Closure,
  Caution,
  Information,
}

export interface Item {
  park_name: string;
  site_code: string;
  category_id: Category;
  state_name: string;
  internal_link: string;
  description: string;
  category: string;
  end_date: Date;
  start_date: Date;
  title: string;
  unique_id: string;
  state_code: string[];
}

export interface Props {
  data: Item[];
}

export interface ParkPageProps {
  parkData: FormattedItem;
  err: any;
}

export interface Status {
  internal_link: string;
  description: string;
  title: string;
}

export interface Statuses {
  [index: number]: Status[];
}

export interface FormattedItem {
  park_name: string;
  state_name: string;
  state_code: string[];
  site_code: string;
  statuses: Statuses;
}

export interface FormattedData {
  [index: string]: FormattedItem;
}
