interface WatchScreenParams {
  v: string;
}

interface SearchScreenParams {
  search_query: string;
}

export type Params = {
  watchScreenParams: WatchScreenParams | undefined;
  searchScreenParams: SearchScreenParams | undefined;
};
