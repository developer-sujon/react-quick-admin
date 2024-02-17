//@ external
import classNames from "classnames";
import { get } from "lodash";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";

//@ internal
// import "easymde/dist/easymde.min.css";
import { Controller } from "react-hook-form";
// import { SimpleMdeReact } from "react-simplemde-editor";
// import JoditEditor from "jodit-react";
import "react-datepicker/dist/react-datepicker.css";
// import { SimpleMdeReact } from "react-simplemde-editor";
import { t } from "i18next";

/* Password Input */
const PasswordInput = ({
  name,
  placeholder,
  refCallback,
  errors,
  register,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputGroup className="mb-0">
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          id={name}
          as="input"
          ref={(r) => {
            if (refCallback) refCallback(r);
          }}
          className={className}
          isInvalid={errors && errors[name] ? true : false}
          {...(register ? register(name) : {})}
          autoComplete={name}
        />
        <div
          className={classNames("input-group-text", "input-group-password", {
            "show-password": showPassword,
          })}
          data-password={showPassword ? "true" : "false"}
        >
          <span
            className="password-eye"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          ></span>
        </div>
      </InputGroup>
    </>
  );
};

const FormInput = ({
  label,
  type,
  name,
  id,
  placeholder,
  register,
  errors,
  control,
  className,
  labelClassName,
  containerClass,
  refCallback,
  children,
  nested,
  required,
  watchValue,
  option,
  options,
  watchFromDate,
  watchToDate,
  extraOnChange,
  ...otherProps
}) => {
  // handle input type
  const comp =
    type === "textarea" ? "textarea" : type === "select" ? "select" : "input";

  switch (type) {
    case "hidden":
      return (
        <input
          type={type}
          name={name}
          {...(register ? register(name) : {})}
          {...otherProps}
        />
      );
    case "password":
      return (
        <Form.Group className={containerClass}>
          {label ? (
            <>
              <Form.Label className={labelClassName} htmlFor={name}>
                {label}
              </Form.Label>
              {children}
            </>
          ) : null}
          {required && <span className="text-danger">*</span>}
          <PasswordInput
            name={name}
            placeholder={placeholder}
            refCallback={refCallback}
            errors={errors}
            register={register}
            className={className}
          />
          {errors && errors[name] ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[name]["message"]}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      );
    case "select":
      return (
        <Form.Group className={containerClass}>
          {label ? (
            <Form.Label className={labelClassName} htmlFor={name}>
              {label}
            </Form.Label>
          ) : null}
          {required && <span className="text-danger">*</span>}
          <Form.Select
            type={type}
            placeholder={placeholder}
            label={label}
            name={name}
            id={name}
            ref={(r) => {
              if (refCallback) refCallback(r);
            }}
            comp={comp}
            className={className}
            isInvalid={errors && errors[name] ? true : false}
            {...(register ? register(name) : {})}
            {...otherProps}
          >
            {children}
          </Form.Select>
          {errors && errors[name] ? (
            <Form.Control.Feedback type="invalid">
              {errors[name]["message"]}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      );
    case "checkbox":
    case "radio":
      return (
        <Form.Group className={containerClass}>
          <Form.Check
            type={type}
            label={label}
            name={name}
            id={id || name}
            ref={(r) => {
              if (refCallback) refCallback(r);
            }}
            className={className}
            isInvalid={errors && errors[name] ? true : false}
            {...(register ? register(name) : {})}
            {...otherProps}
          />

          {errors && errors[name] ? (
            <Form.Control.Feedback type="invalid">
              {errors[name]["message"]}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      );
    case "datePicker":
      return (
        <Form.Group className={containerClass}>
          {label ? (
            <>
              <Form.Label className={labelClassName} htmlFor={name}>
                {label}
              </Form.Label>
              {children}
            </>
          ) : null}
          {required && <span className="text-danger">*</span>}
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, name, ref } }) => {
              return (
                <DatePicker
                  minDate={
                    (name === "endDate" || name === "toDate") && watchFromDate
                      ? new Date(watchFromDate)
                      : undefined
                  }
                  maxDate={
                    (name === "startDate" || name === "fromDate") && watchToDate
                      ? new Date(watchToDate)
                      : undefined
                  }
                  placeholderText={t("select date")}
                  className=" form-control"
                  dateFormat="d MMM yyyy"
                  inputRef={ref}
                  name={name}
                  dayClassName={(date) => date.getDay() === 5 && "text-danger"}
                  value={value ? new Date(value) : undefined}
                  onChange={(date) => onChange(date)}
                  selected={value ? new Date(value) : undefined}
                  {...otherProps}
                />
              );
            }}
          />
          {errors && errors[name] && !watchValue ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[name]["message"]}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      );

    case "react-select":
      return (
        <Form.Group className={containerClass}>
          {label ? (
            <>
              <Form.Label className={labelClassName} htmlFor={name}>
                {label}
              </Form.Label>
              {children}
            </>
          ) : null}
          {required && <span className="text-danger">*</span>}
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ref } }) => {
              return (
                <Select
                  menuPlacement="auto"
                  inputRef={ref}
                  classNamePrefix="react-select"
                  options={option}
                  value={option?.find((c) => c.value === value)}
                  onChange={(val) => {
                    onChange(val.value);
                    extraOnChange && extraOnChange(val);
                  }}
                  placeholder={placeholder}
                />
              );
            }}
          />
          {errors && errors[name] && !watchValue ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[name]["message"]}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      );
    case "text-editor":
      return (
        <Form.Group className={containerClass}>
          {label ? (
            <>
              <Form.Label className={labelClassName} htmlFor={name}>
                {label}
              </Form.Label>
              {children}
            </>
          ) : null}
          {required && <span className="text-danger">*</span>}
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => {
              return "";
              // <SimpleMdeReact
              //   id={1}
              //   options={options}
              //   value={value}
              //   onChange={(val) => onChange(val)}
              // />
            }}
          />
          {errors && errors[name] && !watchValue ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[name]["message"]}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      );
    case "rich-editor":
      return (
        <Form.Group className={containerClass}>
          {label ? (
            <>
              <Form.Label className={labelClassName} htmlFor={name}>
                {label}
              </Form.Label>
              {children}
            </>
          ) : null}
          {required && <span className="text-danger">*</span>}
          <Controller
            control={control}
            name={name}
            render={({ field }) => {
              // return <JoditEditor {...field} placeholder={placeholder} />;
            }}
          />
          {errors && errors[name] && !watchValue ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[name]["message"]}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      );
    default:
      return nested ? (
        <Form.Group className={containerClass}>
          {label ? (
            <Form.Label className={labelClassName} htmlFor={name}>
              {label}
            </Form.Label>
          ) : null}
          {required && <span className="text-danger">*</span>}
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            as={comp}
            ref={(r) => {
              if (refCallback) refCallback(r);
            }}
            className={className}
            isInvalid={errors && get(errors, name) ? true : false}
            {...(register ? register(name) : {})}
            {...otherProps}
            autoComplete={name}
          >
            {children ? children : null}
          </Form.Control>
          {nested && get(errors, name) ? (
            <Form.Control.Feedback type="invalid">
              {get(errors, name)?.message}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      ) : (
        <Form.Group className={containerClass}>
          {label ? (
            <Form.Label className={labelClassName} htmlFor={name}>
              {label}
            </Form.Label>
          ) : null}
          {required && <span className="text-danger">*</span>}
          <Form.Control
            index={Date.now()}
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            as={comp}
            ref={(r) => {
              if (refCallback) refCallback(r);
            }}
            className={className}
            min={0}
            onWheel={(event) => event.target.blur()}
            isInvalid={errors && errors[name] ? true : false}
            {...(register ? register(name) : {})}
            {...otherProps}
            autoComplete={name}
          >
            {children ? children : null}
          </Form.Control>
          {errors && errors[name] ? (
            <Form.Control.Feedback type="invalid">
              {errors[name]["message"]}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
      );
  }
};

export default FormInput;
