//External Lib Import
import { t } from "i18next";
import Swal from "sweetalert2";
import i18n from "../../locales/i18n";

class AlertMessage {
  static Delete(id, request) {
    return Swal.fire({
      title: i18n.t("Are you sure?"),
      text: i18n.t("You won't be able to revert this!"),
      icon: i18n.t("warning"),
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: i18n.t("Cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        return request(id).then((res) => {
          if (res) {
            return true;
          }
        });
      }
    });
  }

  static Update(email, status, option, request) {
    return Swal.fire({
      title: "Change Status",
      input: "select",
      inputOptions: option,
      inputValue: status,
    }).then((result) => {
      if (result.isConfirmed) {
        return request(email, result.value).then((res) => {
          return res;
        });
      }
    });
  }

  static StatusUpdate(id, option, postBody, request) {
    return Swal.fire({
      title: t("change status"),
      input: "select",
      inputOptions: option,
      inputValue: postBody.status,
    }).then((result) => {
      if (result.isConfirmed) {
        return request({
          id,
          postBody: { ...postBody, status: result.value },
        }).then((res) => {
          return res;
        });
      }
    });
  }
}

export default AlertMessage;
