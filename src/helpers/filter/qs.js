// redux store

import store from "../../redux/store";

export const getURL = (route, extraFilter) => {
  const { page, limit, search, sortType, sortBy } = store.getState().pagination;

  let URL = `${route}`;
  if (page) URL += `?page=${page}`;
  if (extraFilter) URL += `&${extraFilter}`;
  if (limit) URL += `&limit=${limit}`;
  if (sortType) URL += `&sortType=${sortType}`;
  if (sortBy) URL += `&sortBy=${sortBy}`;
  if (search) URL += `&q=${search}`;

  return URL;
};
