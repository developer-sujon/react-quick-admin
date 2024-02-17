//External lib imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Internal lib imports
import { useLoginMutation } from "../redux/services/authService";
import * as authValidation from "../validation/auth.validation";

export const DEFAULT_LOGIN_VALUES = {
  mobile: "01772703036",
  password: "123456",
};

const Login = () => {
  const dispatch = useDispatch();
  const [
    login,
    { isLoading: loginLoading, data: loginData, isSuccess: loginSuccess },
  ] = useLoginMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: DEFAULT_LOGIN_VALUES,
    resolver: yupResolver(authValidation.login),
  });

  /*
   * set token localStorage
   */
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  /**
   * Backend Error handler, form handle submit
   */

  const completeSubmit = () => {
    reset({});
  };

  const submitForm = (values) => {
    login({ postBody: values, setError, completeSubmit });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="auth-wrapper">
          <div className="auth-content">
            <Row className="justify-content-center">
              <Col xl={6} className="center-screen text-start">
                <Card className="w-100">
                  <Card.Body>
                    <h5>Sign In</h5>
                    <br />

                    <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                      <Form.Group className="mb-3" controlId="Mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Controller
                          control={control}
                          name="mobile"
                          defaultValue=""
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.mobile}
                              placeholder="Mobile"
                              type="text"
                            />
                          )}
                        />
                        {errors.mobile && (
                          <Form.Text className="text-danger">
                            {errors.mobile.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Controller
                          control={control}
                          name="password"
                          defaultValue=""
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.password}
                              placeholder="Password"
                              type="password"
                            />
                          )}
                        />
                        {errors.password && (
                          <Form.Text className="text-danger">
                            {errors.password.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-block login-btn mt-2"
                          type="submit"
                        >
                          {loginLoading ? (
                            <Spinner size="sm" color="light" />
                          ) : (
                            t("Sign in")
                          )}
                        </button>
                      </div>
                    </Form>
                    <div className="text-center w-100">
                      <br />
                      <Link
                        className="text-center animated fadeInUp"
                        to="/forget-password"
                      >
                        {t("forget password")}
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
