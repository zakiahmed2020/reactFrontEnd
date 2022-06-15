import React, { useState } from "react";
import {
  Row,
  Col,
  Alert,
  Button,
  Container,
  FormGroup,
  Label,
  UncontrolledAlert,
} from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { forgetUser } from "../../store/actions";

// import images
import logodark from "../../assets/images/logo-dark.png";
import Logo1 from "../../assets/images/logo1.png";

function ForgetPasswordPage({ history }) {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    password: "",
  });
  const [alertVisible, setAlertVisible] = useState({
    visible: false,
    message: "",
    color: "",
    classesname:""
  });
  // handleValidSubmit
  const handle_submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        "https://protected-spire-91265.herokuapp.com/api/users/passUpdate",
        user
      );
      console.log(data);
      const { status, message } = data;
      if (status) {
        let success = "success";
        let classn="mdi mdi-check-all mr-2"
        setAlertVisible({ visible: true, message: message, color: success,classesname:classn });

        // history.push("/dashboard");
      } else {
        let danger = "danger";
        let classn="mdi mdi-block-helper mr-2";
        setAlertVisible({ visible: true, message: message, color: danger,classesname:classn });
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

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/">
          <i className="mdi mdi-home-variant h2 text-white"></i>
        </Link>
      </div>
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

                          <h4 className="font-size-18 mt-4">Reset Password</h4>
                          <p className="text-muted">
                            Reset your password to Nazox.
                          </p>
                        </div>

                        <div className="p-2 mt-5">
                          {/* {alertVisible.visible ? (
                              <Alert color={alertVisible.color} className="mb-4">
                                {alertVisible.message}
                              </Alert>
                            ) : null} */}


                        
                            <UncontrolledAlert
                              color={alertVisible.color}
                              className="alert-dismissible fade show" role="alert"
                              isOpen={alertVisible.visible}
                              type="hidden"                         
                            >
                              <i className={alertVisible.classesname}></i>
                              {alertVisible.message}
                            </UncontrolledAlert>
                        

                          <AvForm
                            className="form-horizontal"
                            onValidSubmit={handle_submit}
                          >
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="useremail">Username</Label>
                              <AvField
                                name="username"
                                value={user.username}
                                onChange={(e) => handleChange(e)}
                                type="text"
                                errorMessage="username is Required"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                placeholder="Enter username"
                              />
                            </FormGroup>
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-phone-line auti-custom-input-icon"></i>
                              <Label htmlFor="phone">Phone</Label>
                              <AvField
                                name="phone"
                                value={user.phone}
                                onChange={(e) => handleChange(e)}
                                type="number"
                                errorMessage="Phone is Required"
                                validate={{ required: { value: true } }}
                                className="form-control"
                                placeholder="Enter phone number"
                              />
                            </FormGroup>
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-lock-line auti-custom-input-icon"></i>
                              <Label htmlFor="useremail">Password</Label>
                              <AvField
                                name="password"
                                value={user.password}
                                onChange={(e) => handleChange(e)}
                                type="password"
                                errorMessage="password is Required"
                                validate={{ required: { value: true } }}
                                className="form-control"
                                placeholder="Enter new password"
                              />
                            </FormGroup>

                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                Reset Password
                                {/* {this.props.loading ? "Loading..." : "Reset"} */}
                              </Button>
                            </div>
                          </AvForm>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            Don't have an account ?{" "}
                            <Link
                              to="/login"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Log in{" "}
                            </Link>{" "}
                          </p>
                          <p>
                            © 2020 Nazox. Crafted with{" "}
                            <i className="mdi mdi-heart text-danger"></i> by
                            Themesdesign
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

export default ForgetPasswordPage;
