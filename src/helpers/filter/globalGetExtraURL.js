export const globalGetExtraURL = (props) => {
  let URL = "";
  props?.map((item) => {
    if (item?.field) URL += `&${item?.key}=${item?.field}`;
  });
  return URL;
};
