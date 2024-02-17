//@ external
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import MappedComponent from "../../../components/form/MappedComponent";

import {
  useModeratorCreateMutation,
  useModeratorUpdateMutation,
} from "../../../redux/services/Moderators/moderator.services";

const ModeratorCreateUpdate = ({
  modal,
  setModal,
  toggle,
  editData,
  defaultValues,
}) => {
  const { setError } = useForm(); // Initialize the form using useForm
  const { t } = useTranslation();

  const [moderatorCreate, { isLoading, isSuccess, error: createEror }] =
    useModeratorCreateMutation();
  const [
    moderatorUpdate,
    { isLoading: updateLoad, isSuccess: updateSuccess, error: updateEror },
  ] = useModeratorUpdateMutation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .required(t("name is required"))
        .min(2, t("minimum containing 2 letters")),
      mobile: yup
        .string()
        .required(t("Mobile number is required"))
        .matches(/^(01[3-9]\d{8})$/, t("Invalid mobile number")),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),

      ...(!editData && {
        password: yup
          .string()
          .required(t("Password is required."))
          .min(
            6,
            t(
              "Password must be at least 6 characters and at most 30 characters"
            )
          )
          .max(
            30,
            t(
              "Password must be at least 6 characters and at most 30 characters"
            )
          ),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], t("passwords must match")),
      }),
      status: yup.string().required(t("please select status")),
    })
  );

  const inputData = [
    {
      label: t("name"),
      type: "text",
      name: "name",
      placeholder: t("please enter name"),
      containerClass: "mb-3",
      col: "col-12",
      required: true,
    },
    {
      label: t("mobile"),
      type: "text",
      name: "mobile",
      placeholder: t("please enter mobile"),
      containerClass: "mb-3",
      col: "col-12",
      required: true,
    },
    {
      label: t("email"),
      type: "text",
      name: "email",
      placeholder: t("please enter email"),
      containerClass: "mb-3",
      col: "col-12",
      required: true,
    },
    ...(editData
      ? []
      : [
          {
            label: t("password"),
            type: "text",
            name: "password",
            placeholder: t("please enter password"),
            containerClass: "mb-3",
            col: "col-12",
            required: true,
          },
          {
            label: t("confirmPassword"),
            type: "text",
            name: "confirmPassword",
            placeholder: t("please enter confirmPassword"),
            containerClass: "mb-3",
            col: "col-12",
            required: true,
          },
        ]),
    {
      label: t("status"),
      type: "react-select",
      name: "status",
      placeholder: t("select status"),
      containerClass: "mb-3",
      col: "col-12 col-md-12 col-lg-12",
      required: true,
      options: [
        {
          label: t("APPROVED"),
          value: "APPROVED",
        },
        {
          label: t("DECLINE"),
          value: "DECLINE",
        },
        {
          label: t("BLOCK"),
          value: "BLOCK",
        },
        {
          label: t("DELETED"),
          value: "DELETED",
        },
      ],
    },
  ];

  const onSubmit = ({ name, mobile, email, password, status, _id }) => {
    const postBody = { name, mobile, email, password, status };
    if (!editData) {
      moderatorCreate({
        postBody,
        setError,
      });
    } else {
      delete postBody.password;
      moderatorUpdate({
        postBody,
        id: _id,
        setError,
      });
    }
  };

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      setModal(false);
    }
  }, [isSuccess, updateSuccess]);

  return (
    <Card className={classNames("", { "d-none": !modal })}>
      <Card.Body>
        <Modal
          show={modal}
          onHide={() => {
            toggle();
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header onHide={toggle} closeButton>
            <div>
              <h4 className="modal-title">
                {editData ? t("update moderator") : t("add moderator")}
              </h4>
              <p className="mt-1">
                {t(`the field levels marked with `)}
                <span style={{ color: "red" }}>( * )</span>
                {t(` are required input fields.`)}
              </p>
            </div>
          </Modal.Header>

          <Modal.Body>
            <MappedComponent
              inputField={inputData}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              schemaResolver={schemaResolver}
              isLoading={isLoading}
              updateLoad={updateLoad}
              editData={editData}
              updateTitle={t("update moderator")}
              createTitle={t("add moderator")}
              backendError={
                updateEror?.data ? updateEror?.data : createEror?.data
              }
            />
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default ModeratorCreateUpdate;
