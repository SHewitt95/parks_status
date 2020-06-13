import { FormattedData } from "../types";

export interface Action {
  type: string;
  payload: any;
}

export interface State {
  searchQuery: string;
  data: undefined | FormattedData;
  loading: boolean;
}
