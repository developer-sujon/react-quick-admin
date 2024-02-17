//@ External Lib Import
import JoditEditor from "jodit-react";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
// import SimpleMdeReact from "react-simplemde-editor";

//@ Internal Lib Import
import "easymde/dist/easymde.min.css";
import "react-datepicker/dist/react-datepicker.css";
import RenderTooltip from "../../utils/RanderTooltip";
import { CustomDateRange, CustomerDatePicker } from "./DateRange";

// import { SimpleMdeReact } from "react-simplemde-editor";

const CustomInput = ({
  type = "text",
  name,
  id,
  label = "",
  addIcon = {
    icon: false,
    componentName: "",
    toolTipName: "",
    componentProps: {},
  },
  required = false,
  labelClassName,
  className,
  containerClass,
  placeholder = "",
  options,
  children,
  isDisabled = false,
  // disable,
  // variant,
  // defaultValue,
  checked,
  extraFun,
  extraOnChange,
  warning,
  loadOption,
  customError,
  extraFunCalling,
  filterOption,
  formatOptionLabel,
  placeholderText,
  endDateField,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const [modal, setModal] = useState(false);

  const [imageURL, setImageURL] = useState("");
  const toggle = () => {
    setModal(!modal);
  };
  const comp =
    type === "textarea" ? "textarea" : type === "select" ? "select" : "input";

  switch (type) {
    case "number":
      return (
        <Form.Group className={containerClass}>
          {label && (
            <Form.Label className={labelClassName} htmlFor={name}>
              {label} {required && <span className="text-danger">*</span>}
            </Form.Label>
          )}
          <Controller
            name={name}
            control={control}
            defaultValue={0}
            render={({ field, fieldState: { error } }) => (
              <>
                <Form.Control
                  {...field}
                  ref={field.ref}
                  index={Date.now()}
                  type={type}
                  placeholder={placeholder || 0}
                  name={name}
                  id={name}
                  min={0}
                  as={comp}
                  className={className}
                  isInvalid={!!error}
                  {...otherProps}
                  autoComplete={name}
                  disabled={isDisabled}
                  onWheel={(event) => event.target.blur()}
                  onChange={(e) => {
                    const maxNumericValue = otherProps?.max;
                    const numericValue = parseFloat(e.target.value);

                    if (numericValue > maxNumericValue) {
                      // If the value is greater than the maximum, set it to the maximum value
                      field.onChange(maxNumericValue);
                      extraOnChange && extraOnChange(maxNumericValue);
                    } else {
                      // Otherwise, set the value to the entered numeric value
                      field.onChange(numericValue);
                      extraOnChange && extraOnChange(numericValue);
                    }
                  }}
                />
                {field.value && warning && field.value > 0 ? (
                  <Form.Control.Feedback
                    type="invalid"
                    className={"text-warning d-block"}
                  >
                    {warning}
                  </Form.Control.Feedback>
                ) : (
                  ""
                )}
                {error && (
                  <Form.Control.Feedback type="invalid">
                    {error.message}
                  </Form.Control.Feedback>
                )}
              </>
            )}
          />
        </Form.Group>
      );

    case "rich-editor":
      return (
        <Form.Group className={containerClass}>
          {label && (
            <Form.Label className={labelClassName} htmlFor={name}>
              {label} {required && <span className="text-danger">*</span>}
            </Form.Label>
          )}
          <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <JoditEditor
                    spellCheck={true}
                    {...field}
                    placeholder={placeholder}
                    config={{
                      placeholder: placeholder,
                      height: otherProps.height,
                    }}
                  />
                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
        </Form.Group>
      );

    case "text-editor":
      return (
        <Form.Group className={containerClass}>
          {label && (
            <Form.Label className={labelClassName} htmlFor={name}>
              {label} {required && <span className="text-danger">*</span>}
            </Form.Label>
          )}
          <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <SimpleMdeReact
                    {...field}
                    id={1}
                    className={`${error ? "is-invalid" : ""}`}
                    options={options}
                    spellCheck={true}
                  />

                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
        </Form.Group>
      );

    case "react-select-multiple":
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
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <ReactSelect
                    closeMenuOnSelect={false}
                    {...field}
                    ref={field.ref}
                    placeholder={placeholder}
                    menuPlacement="auto"
                    classNamePrefix="react-select"
                    className={`${error ? "is-invalid" : ""}`}
                    options={options}
                    isSearchable
                    isClearable
                    isMulti
                    filterOption={filterOption}
                    onChange={(values) => {
                      extraFun && extraFun(values);
                      !extraFunCalling && field.onChange(values);
                    }}
                  />
                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
        </Form.Group>
      );

    case "aysncreact-select":
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
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <AsyncSelect
                    closeMenuOnSelect={false}
                    {...field}
                    loadOptions={loadOption}
                    cacheOptions
                    isClearable
                    isMulti
                    onChange={(values) => {
                      extraFun && extraFun(values);
                      !extraFunCalling && field.onChange(values);
                    }}
                    placeholdertext={placeholder}
                    menuPlacement="auto"
                    inputRef={field.ref}
                    ref={field.ref}
                    isDisabled={isDisabled}
                    classNamePrefix="react-select"
                    className={`${error ? "is-invalid" : ""}`}
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 999999999999 }),
                    }}
                  />

                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
        </Form.Group>
      );

    case "aysncreact-barcode-select":
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
          {required && <span className="text-danger">{" *"} </span>}
          <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <InputGroup className="mb-3" style={{ flexWrap: "nowrap" }}>
                    <Button type="button" variant="secondary" class="btn-lg">
                      <i className="mdi mdi-barcode"></i>
                    </Button>
                    <AsyncSelect
                      {...field}
                      loadOptions={loadOption}
                      value={[]}
                      cacheOptions
                      isClearable
                      isMulti={true}
                      onChange={(values) => {
                        extraFun && extraFun(values);
                        !extraFunCalling && field.onChange(values);
                      }}
                      placeholderText={placeholderText}
                      menuPlacement="auto"
                      inputRef={field.ref}
                      ref={field.ref}
                      isDisabled={isDisabled}
                      formatOptionLabel={formatOptionLabel}
                      classNamePrefix="react-select"
                      className={`${error ? "w-100" : "w-100"}`}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 999999999999,
                        }),
                      }}
                    />
                  </InputGroup>
                </>
              );
            }}
          />
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
          ) : null}{" "}
          {addIcon.icon === true && (
            <OverlayTrigger
              placement="top"
              overlay={RenderTooltip({ name: addIcon.toolTipName })}
            >
              <span
                className="mdi mdi-plus-circle text-primary cursor-pointer fs-4"
                onClick={() => setModal(true)}
              ></span>
            </OverlayTrigger>
          )}
          {required && <span className="text-danger">*</span>}
          <Controller
            control={control}
            name={name}
            render={({
              field: { ref, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <>
                  <ReactSelect
                    placeholder={placeholder}
                    menuPlacement="auto"
                    inputRef={ref}
                    ref={ref}
                    isDisabled={isDisabled}
                    classNamePrefix="react-select"
                    className={`${error ? "is-invalid" : ""}`}
                    options={options}
                    value={options?.find((c) => c.value === value)}
                    onChange={(val) => {
                      // extraFun && extraFun(val), onChange(val.value); (it was the previous code)

                      onChange(val.value);
                      extraFun && extraFun(val);
                    }}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 999999999999 }),
                    }}
                  />

                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {/* {error["message"]} */}
                      {error.message}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
          {addIcon.componentName && (
            <addIcon.componentName
              {...{
                modal,
                setModal,
                toggle,
                ...addIcon.componentProps,
              }}
            />
          )}
        </Form.Group>
      );

    // case "react-select":
    //   return (
    //     <Form.Group className={containerClass}>
    //       {label && (
    //         <>
    //           <Form.Label className={labelClassName} htmlFor={name}>
    //             {label}
    //           </Form.Label>
    //           {children}
    //         </>
    //       )}

    //       {addIcon.icon === true && (
    //         <OverlayTrigger
    //           placement="top"
    //           overlay={RenderTooltip({ name: addIcon.toolTipName })}
    //         >
    //           <span
    //             className="mdi mdi-plus-circle text-primary cursor-pointer fs-4"
    //             onClick={() => setModal(true)}
    //           ></span>
    //         </OverlayTrigger>
    //       )}

    //       {required && <span className="text-danger">*</span>}

    //       <Controller
    //         control={control}
    //         name={name}
    //         render={({
    //           field: { ref, value, onChange },
    //           fieldState: { error },
    //         }) => (
    //           <>
    //             <ReactSelect
    //               placeholder={placeholder}
    //               menuPlacement="auto"
    //               inputRef={ref}
    //               ref={ref}
    //               isDisabled={isDisabled}
    //               classNamePrefix="react-select"
    //               className={`${error ? "is-invalid" : ""}`}
    //               options={options}
    //               value={options?.find((c) => c.value === value)}
    //               onChange={(val) => {
    //                 // Ensure that onChange is called with the correct value
    //                 onChange(val.value);

    //                 // If extraFun is defined, call it with the selected value
    //                 extraFun && extraFun(val);
    //               }}
    //               menuPortalTarget={document.body}
    //               styles={{
    //                 menuPortal: (base) => ({ ...base, zIndex: 999999999999 }),
    //               }}
    //             />

    //             {error && (
    //               <Form.Control.Feedback type="invalid" className="d-block">
    //                 {error.message}
    //               </Form.Control.Feedback>
    //             )}
    //           </>
    //         )}
    //       />

    //       {addIcon.componentName && (
    //         <addIcon.componentName
    //           {...{
    //             modal,
    //             setModal,
    //             toggle,
    //             ...addIcon.componentProps,
    //           }}
    //         />
    //       )}
    //     </Form.Group>
    //   );

    case "file":
      return (
        <Form.Group className={containerClass}>
          {label && (
            <Form.Label className={labelClassName} htmlFor={name}>
              {label} {required && <span className="text-danger">*</span>}
            </Form.Label>
          )}
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Form.Control
                  ref={field.ref}
                  index={Date.now()}
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  id={name}
                  as={comp}
                  className={className}
                  isInvalid={!!error}
                  {...otherProps}
                  autoComplete={name}
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    extraOnChange && extraOnChange(e.target.files);
                  }}
                />

                {error && (
                  <Form.Control.Feedback type="invalid">
                    {error.message}
                  </Form.Control.Feedback>
                )}
              </>
            )}
          />
        </Form.Group>
      );

    case "checkbox":
      return (
        <Form.Group className={containerClass}>
          <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <Form.Check
                    {...field}
                    type={type}
                    label={
                      required ? (
                        <>
                          {label} <span className="text-danger">*</span>
                        </>
                      ) : (
                        <p className="fw-normal">{label}</p>
                      )
                    }
                    name={name}
                    id={name}
                    defaultChecked={checked || field.value}
                    className={className}
                    disabled={isDisabled}
                    isInvalid={!!error || customError}
                    {...otherProps}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      extraOnChange && extraOnChange(e.target.checked);
                    }}
                  />

                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
        </Form.Group>
      );
    case "radio":
      return (
        <Form.Group className={containerClass}>
          <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <Form.Check
                    {...field}
                    type={type}
                    label={
                      required ? (
                        <>
                          {label} <span className="text-danger">*</span>
                        </>
                      ) : (
                        <p className="fw-normal">{label}</p>
                      )
                    }
                    name={name}
                    id={id || name}
                    value={field.value}
                    checked={otherProps.value === field.value}
                    className={className}
                    isInvalid={!!error || customError}
                    {...otherProps}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      extraOnChange && extraOnChange(e.target.value);
                    }}
                    disabled={isDisabled}
                  />

                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
        </Form.Group>
      );
    case "datePicker2":
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
            render={({
              field: { onChange, value, name, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <DatePicker
                    // minDate={
                    //   name === "startDate"
                    //     ? new Date()
                    //     : undefined || name === "endDate"
                    //     ? new Date(endDateField)
                    //     : undefined
                    // }

                    minDate={
                      (name === "endDate" || name === "toDate") && endDateField
                        ? new Date(endDateField)
                        : undefined
                    }
                    placeholderText={t("select date")}
                    className="form-control"
                    dateFormat="d MMM yyyy"
                    inputRef={ref}
                    name={name}
                    dayClassName={(date) =>
                      date.getDay() === 5 && "text-danger"
                    }
                    value={value ? new Date(value) : undefined}
                    onChange={(date) => onChange(date)}
                    selected={value ? new Date(value) : undefined}
                    {...otherProps}
                  />
                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
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
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <CustomerDatePicker
                    {...field}
                    placeholderText={placeholder}
                    oneTap
                    className={`p-0 border-0 form-control ${
                      error ? "is-invalid" : ""
                    }`}
                    dateFormat="dddd MMM yyyy"
                    extraOnChange={(date) => field.onChange(date)}
                    defaultValue={
                      field.value ? new Date(field.value) : undefined
                    }
                  />
                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
        </Form.Group>
      );

    case "dateRangePicker":
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
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <CustomDateRange
                    placeholder={placeholder}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    extraOnChange={(date) => field.onChange(date)}
                    defaultValue={field?.value?.map(
                      (i) => new Date(i || undefined)
                    )}
                  />
                  {error ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {error["message"]}
                    </Form.Control.Feedback>
                  ) : null}
                </>
              );
            }}
          />
        </Form.Group>
      );
    default:
      return (
        <Form.Group className={containerClass}>
          {label && (
            <Form.Label className={labelClassName} htmlFor={name}>
              {label} {required && <span className="text-danger">*</span>}
            </Form.Label>
          )}
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Form.Control
                  spellCheck={true}
                  {...field}
                  index={Date.now()}
                  type={type}
                  placeholder={placeholder}
                  isDisabled={isDisabled}
                  name={name}
                  id={name}
                  as={comp}
                  className={className}
                  isInvalid={!!error}
                  {...otherProps}
                  autoComplete={name}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    extraOnChange && extraOnChange(e.target.value);
                  }}
                />

                {error && (
                  <Form.Control.Feedback type="invalid">
                    {error.message}
                  </Form.Control.Feedback>
                )}
              </>
            )}
          />
        </Form.Group>
      );
  }
};

export default CustomInput;
