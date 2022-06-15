import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
 
  Container,
  Label,
  FormGroup,
  UncontrolledAlert,
} from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
// import {
//   registerUser,
//   registerUserFailed,
//   apiError,
// } from "../../store/actions";

// Redux
// import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import images
// import logodark from "../../assets/images/logo-dark.png";
import logo1 from "../../assets/images/logo1.png";
import axios from "axios";

function Register(props) {
  const [register, setRegister] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
  });
  const [AlertVisvible, setAlertVisvible] = useState({
    visible: false,
    message: "",
    color: "",
  });
  const handleAlert = (visible, message, Acolor) => {
    setAlertVisvible({ visible: visible, message: message, color: Acolor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // props.registerUser(values)
    try {
      const { data } = await axios.post(
        "https://protected-spire-91265.herokuapp.com/api/users",
        register
      );
      const { status, message } = data;
      if (status) {
        let s = "success";
        console.log(s);
        window.location.assign("login")

        // handleAlert(true, message, s);
        setRegister({ name: "", phone: "", username: "", password: "" });
      } else {
        let d = "danger";
        handleAlert(true, message, d);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleChange = (e) => {
    console.log(e.target.name + " " + e.target.value);
    setRegister((prev) => {
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
                            <Link to="#" className="logo">
                              <img src={logo1} height="100" width="150" alt="logo" />
                            </Link>
                          </div>

                          <h4 className="font-size-18 mt-2">
                            Register account
                          </h4>
                        </div>

                        {/* <Alert isOpen={AlertVisvible.visible} color={AlertVisvible.color}>
                          {AlertVisvible.message}
                        </Alert> */}

                        <UncontrolledAlert
                          isOpen={AlertVisvible.visible}
                          color={AlertVisvible.color}
                          role="alert"
                        >
                          {AlertVisvible.message}
                        </UncontrolledAlert>

                        {/* {props.registrationError && (
                          <Alert color="danger">
                            {this.props.registrationError}
                          </Alert>
                        )} */}

                        <div className="p-2 mt-2">
                          <AvForm
                            onValidSubmit={handleSubmit}
                            className="form-horizontal"
                          >
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className=" ri-user-follow-line auti-custom-input-icon"></i>
                              <Label htmlFor="useremail">Name</Label>
                              <AvField
                                name="name"
                              
                                
                                value={register.name}
                                onChange={(e) => handleChange(e)}
                                require
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                                errorMessage="Enter Name"
                                validate={{ required: { value: true } }}
                              />
                            </FormGroup>

                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-phone-line auti-custom-input-icon"></i>

                              <Label htmlFor="username">Phone No</Label>
                              <AvField
                                name="phone"
                               
                               
                                value={register.phone}
                                onChange={(e) => handleChange(e)}
                                require
                                type="number"
                                className="form-control"
                                id="phone"
                                placeholder="Enter Phone "
                                errorMessage="Enter phone"
                                validate={{ required: { value: true } }}
                              />
                            </FormGroup>
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Username</Label>
                              <AvField
                                name="username"
                                                        
                                value={register.username}
                                onChange={(e) => handleChange(e)}
                                type="email"
                                className="form-control"
                                id="username"
                                placeholder="Enter email"
                                errorMessage="Enter valid email"
                                validate={{ required: { value: true } }}
                              />
                            </FormGroup>

                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="userpassword">Password</Label>
                              <AvField
                                name="password"
                               
                                value={register.password}
                                onChange={(e) => handleChange(e)}
                                type="password"
                                className="form-control"
                                id="userpassword"
                                placeholder="Enter password"
                                errorMessage="Enter password"
                                validate={{ required: { value: true } }}
                              />
                            </FormGroup>

                            <div className="text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                {props.loading ? "Loading ..." : "Register"}
                              </Button>
                            </div>
                          </AvForm>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            Already have an account ?{" "}
                            <Link
                              to="/login"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Login
                            </Link>{" "}
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
//   const { user, registrationError, loading } = state.Account;
//   return { user, registrationError, loading };
// };

export default Register;
