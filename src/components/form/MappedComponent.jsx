/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

const MappedComponent = ({
  startDateField,
  endDateField,
  inputField,
  onSubmit,
  schemaResolver,
  defaultValues,
  isLoading,
  updateLoad,
  editData,
  updateTitle,
  createTitle,
  submitBtn = true,
  backendError,
}) => {
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: schemaResolver,
  });
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
    setError,
  } = methods;
  const watchFromDate = startDateField && watch(startDateField);
  const watchToDate = endDateField && watch(endDateField);

  useEffect(() => {
    if (watchFromDate && watchToDate) {
      const watchFromDateSec = new Date(watchFromDate).getTime() / 1000;
      const watchToDateSec = new Date(watchToDate).getTime() / 1000;
      setValue(
        "numOfDay",
        parseInt((watchToDateSec - watchFromDateSec) / 86400) + 1
      );
    }
  }, [watchFromDate, watchToDate]);

  useEffect(() => {
    if (backendError?.code == 400 && Array.isArray(backendError?.data)) {
      backendError?.data?.forEach((item) => {
        setError(item.field, {
          type: "server",
          message: item?.message,
        });
      });
    }
  }, [backendError, setError]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"formClass"} noValidate>
      <Row>
        {inputField.map((item, i) => {
          const {
            label,
            type,
            name,
            placeholder,
            containerClass,
            required,
            options,
            watchValue,
            disabled,
            nested,
            ...rest
          } = item;

          if (item.isVisible === false) {
            return (
              <Col className="d-none" key={i}>
                <FormInput
                  watchFromDate={watchFromDate}
                  watchToDate={watchToDate}
                  label={item.label}
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  containerClass={item.containerClass}
                  required={item.required}
                  register={register}
                  errors={errors}
                  option={item.options}
                  control={control}
                  watchValue={item.watchValue}
                  setValue={setValue}
                  disabled={item.disabled}
                  nested={item.nested}
                  {...rest}
                ></FormInput>
              </Col>
            );
          } else {
            return (
              <Col className={item.col} key={i}>
                <FormInput
                  watchFromDate={watchFromDate}
                  watchToDate={watchToDate}
                  label={item.label}
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  containerClass={item.containerClass}
                  required={item.required}
                  register={register}
                  errors={errors}
                  option={item.options}
                  control={control}
                  watchValue={item.watchValue}
                  setValue={setValue}
                  disabled={item.disabled}
                  nested={item.nested}
                  {...rest}
                ></FormInput>
              </Col>
            );
          }
        })}

        <div className="mt-3 text-end">
          <Button
            variant={!submitBtn ? "secondary" : "primary"}
            type="submit"
            disabled={!submitBtn}
          >
            {editData ? updateTitle : createTitle}
            &nbsp;
            {(isLoading || updateLoad) && (
              <Spinner color={"primary"} size={"sm"} />
            )}
          </Button>
        </div>
      </Row>
    </form>
  );
};

export default MappedComponent;
