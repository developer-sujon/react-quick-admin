//External Lib Import

import moment from "moment";

export function formatDate(dateTimeString) {
  return moment(dateTimeString).format("D MMM YYYY");
}
