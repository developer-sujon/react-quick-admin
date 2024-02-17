//External Lib Import
import * as yup from "yup";

//Internal Lib Import
import i18n from "../locales/i18n";

export const login = yup.object({
  mobile: yup
    .string()
    .required(i18n.t("Mobile number is required"))
    .matches(/^(01[3-9]\d{8})$/, i18n.t("Invalid mobile number")),

  password: yup
    .string()
    .required(i18n.t("Password is required."))
    .min(
      6,
      i18n.t("Password must be at least 6 characters and at most 30 characters")
    )
    .max(
      30,
      i18n.t("Password must be at least 6 characters and at most 30 characters")
    ),
});

export const register = yup.object({
  name: yup.string().required(i18n.t("Name is required")),
  mobile: yup
    .string()
    .required(i18n.t("Mobile number is required"))
    .matches("^(?:\\+88|88)?(01[3-9]\\d{8})$", i18n.t("Invalid mobile number")),
  password: yup
    .string()
    .required(i18n.t("Password is required."))
    .min(8, i18n.t("Password must be 8 digits long")),
  confirmPassword: yup
    .string()
    .required(i18n.t("Confirm password is required"))
    .oneOf(
      [yup.ref("password"), null],
      i18n.t("Password and confirm password must match")
    ),
});
