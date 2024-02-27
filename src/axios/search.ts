import {axiosIntance} from '.';

export class SearchApi {
  getSiminalResults(searchQuery: string) {
    return axiosIntance.get(
      `/search` +
        new URLSearchParams({
          v: searchQuery,
        }),
    );
  }

  addResult(searchQuery: string) {
    return axiosIntance.post(
      `/search` +
        new URLSearchParams({
          v: searchQuery,
        }),
    );
  }
}
