import React, { useState } from "react";

import {
  Row,
  Col,
  Input,
  Button,
  Container,
  Label,
  FormGroup,
 
  UncontrolledAlert,
} from "reactstrap";

// Redux

import {  Link} from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
// import { Route, Redirect } from "react-router-dom";
// actions
// import { checkLogin, apiError } from "../../store/actions";


// import images
// import logodark from "../../assets/images/logo-dark.png";
// import Logo from "../../assets/images/logo.png";
import Logo1 from "../../assets/images/logo1.png";

import axios from "axios";
function Login({ history }) {
  // let history=useHistory()
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const [alertVisible, setAlertVisible] = useState({
    visible: false,
    message: "",
  });

  const handle_submit = async (e) => {
    e.preventDefault();
    const main = {
      username: user.name,
      password: user.password,
    };
    try {
      const { data } = await axios.post("https://protected-spire-91265.herokuapp.com/api/auth", main);
      const { status, message, token } = data;
      if (status) {
        localStorage.setItem("token", token);
        history.push("/dashboard");
      } else {
        setAlertVisible({ visible: true, message: message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
const handleRedirect=()=>{
  console.log("cliked");
}
  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="no-gutters">
            <Col lg={7}>
              <div className="authentication-bg">
                <div className="bg-overlay"></div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <Row className="justify-content-center">
                    <Col lg={9}>
                      <div>
                        <div className="text-center">
                          <div>
                            <Link to="/" className="logo">
                              <img
                                src={Logo1}
                                height="100"
                                width="150"
                                alt="logo"
                              />
                            </Link>
                          </div>
                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>

                          <UncontrolledAlert
                            isOpen={alertVisible.visible}
                            type="hidden"
                            color="danger"
                            role="alert"
                          >
                            {alertVisible.message}
                          </UncontrolledAlert>
                        </div>

                        {/* {this.props.loginError && this.props.loginError ? <Alert color="danger">{this.props.loginError}</Alert> : null } */}

                        <div className="p-2 mt-5">
                          <AvForm
                            className="form-horizontal"
                            onValidSubmit={handle_submit}
                          >
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Username</Label>
                              {/* <Input className="form-control" type="text" /> */}

                              <AvField
                                type="text"
                                
                                value={user.name}
                                onChange={(e) => handleChange(e)}
                                name="name"
                                className="form-control"
                                placeholder="Enter username"
                                errorMessage="Enter username"
                                validate={{ required: { value: true } }}
                              />
                            </FormGroup>

                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="userpassword">Password</Label>
                              <AvField
                                required
                                name="password"
                                type="password"
                                className="form-control"
                                value={user.password}
                                onChange={(e) => handleChange(e)}
                                id="userpassword"
                                placeholder="Enter password"
                                errorMessage="Enter password"
                                validate={{ required: { value: true } }}
                              />
                            </FormGroup>

                            <div className="custom-control custom-checkbox">
                              <Input
                                type="checkbox"
                                className="custom-control-input"
                                id="customControlInline"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                Log In
                              </Button>
                            </div>

                            <div onClick={handleRedirect} className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock mr-1"></i> Forgot
                                your password?
                              </Link>
                            </div>
                          </AvForm>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            Don't have an account ?{" "}
                            <Link
                              to="/Register"
                              className="font-weight-medium text-primary"
                            >
                             
                              Register
                            </Link>
                             
                                 
                          </p>
                          <p>
                            © 2021 Developed{" "}
                            <i className="mdi mdi-heart text-danger"></i> By
                            Zaki Ahmed
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

// const mapStatetoProps = (state) => {
//   const { loginError } = state.Login;
//   return { loginError };
// };

export default Login;
