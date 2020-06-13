export interface Action {
  type: string;
  payload: any;
}

export interface State {
  searchQuery: string;
}
