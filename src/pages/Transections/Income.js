import React, { useEffect, useState} from "react";
// import { Container } from "reactstrap";
// import Fetchdata from "./TransectionApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBDataTable } from "mdbreact";
// import axios from "axios"
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  CardHeader,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,

} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { AvForm, AvField} from "availity-reactstrap-validation";
// import { FetchTrensections } from "./TransectionApi";
import Datepicker from "react-datepicker";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
//Import Components
import axios from "axios";
import jwtDecode from "jwt-decode";

const TransFunctional = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [income, setIncome] = useState([]);
  const [editCondition, setEditCondition] = useState(false);
  const [incomeObject, setIncomeObject] = useState({
    date: new Date(),
    description: "",
    amount: "",
  });
 
  const [SweetAlertState, setSweetAlertState] = useState({
    id: null,
    state: false,
    deleted: false,
  });
 
  const [CurrentUserInfo, setCurrentUserInfo] = useState({
    name: "",
    UserID: "",
  });
  // const { date, description, amount } = incomeObject;

  // const [currentDate,setCurrentDate] = useState(
  //   new Date().toLocaleDateString()
  // )
  useEffect(() => {
    const fetchTrensections = async () => {
      try {
        let userID = "";
        let token = null
        if (localStorage.getItem("token")) {
          token = localStorage.getItem("token");
          const user = jwtDecode(token);
          const { _id, name } = user;
          userID = _id;
          setCurrentUserInfo({ UserID: _id, name: name });
        }

        const { data } = await axios.get(
          `https://protected-spire-91265.herokuapp.com/api/transection/${userID}/income`,{
            headers : { 'Content-Type': 'application/json', "x-auth-token":token}
          }
        );
        setIncome(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrensections();
  }, []);

  const tog_standard = () => {
    setIsOpen(!isOpen);
    // setIncomeObject({
    //   date: new Date(),
    //   amount: "",
    //   description: "",
    // });

    // setEditCondition(!editCondition);
  };
  const breadcrumbItems = [
    { title: "Nazox", link: "#" },
    { title: "Income", link: "#" },
  ];

 
  const handleChange = (e) => {
    console.log(e.target.name + " ", e.target.value);
    setIncomeObject((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChangeDate = (dt) => {
    console.log(dt);
    setIncomeObject((prev) => {
      return { ...prev, date: dt };
    });
  };

  const notify = (message, type) => toast[type](message);

  const HandleSubmitBtn = async (e) => {
    try {
      e.preventDefault();
      const main = {
        ...incomeObject,
        userID: CurrentUserInfo.UserID,
        type: "income",
      };
      
      console.log("edit condition", editCondition);
      delete main.Time;
      delete main.action;
      const token = localStorage.getItem("token");

      if (editCondition) {
        const { data } = await axios.put(
          `https://protected-spire-91265.herokuapp.com/api/transection/${main._id}`,main,{
            headers : { 'Content-Type': 'application/json', "x-auth-token":token}
          }
        );
        console.log(data.info);
        const { status, message, info } = { ...data };
        if(status){
          const updata = income.filter((i) => i._id !== main._id);
          setIncome([info, ...updata]);
          notify(message, "success");
          setIsOpen(false);
        }
      } else {
        const { data } = await axios.post(
          `https://protected-spire-91265.herokuapp.com/api/transection`,main,{
            headers : { 'Content-Type': 'application/json', "x-auth-token":token}
          }
        );
        const { status, message, info } = { ...data };
        if(status){
          setIncome((prev) => {
            return [...prev, info];
          });
          setIncomeObject({
            date: new Date(),
            description: "",
            amount: "",
          });
          notify(message, "success");
          setIsOpen(false);
        }else{
          notify(message, "error");
        }
      }
    } catch (error) {
      console.log(error.response);
      notify(error.message, "error");
    }
  };
  const handleDelete = async (id) => {
    setSweetAlertState({ id: id, state: true, deleted: false });
  };
  const handleEdit = async (transData) => {
    let data = { ...transData };
    data.date = new Date(data.date);
    setEditCondition(true);
    setIncomeObject(data);
    setIsOpen(true);
  };


  const UserData = {
    columns: [
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 200,
      },
      {
        label: "Amount",
        field: "amount",
        sort: "asc",
        width: 100,
      },
      {
        label: "Created Date",
        field: "date",
        sort: "asc",
        width: 270,
      },
      {
        label: "Created Time",
        field: "Time",
        sort: "asc",
        width: 270,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 50,
      },
    ],
    rows: income.map((trans) => {
      const data = { ...trans };

      data.Time = new Date(data.date).toLocaleTimeString();
      data.date = new Date(data.date).toLocaleDateString();
      // data.amount="$ "+data.amount;

      data.action = (
        <div>
          <button
            onClick={() => handleEdit(data)}
            type="button"
            className="btn btn-white btn-sm mr-4"
          >
            <i className="mdi mdi-pencil font-size-20 text-primary"></i>
          </button>
          <button
            type="button"
            onClick={() => handleDelete(data._id)}
            className="btn btn-white btn-sm"
          >
            <i className="mdi mdi-trash-can font-size-20 text-danger "></i>
          </button>
        </div>
      );
      return data;
    }),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Income" breadcrumbItems={breadcrumbItems} />
          {/* models   */}
          {SweetAlertState.deleted && (
            <SweetAlert
              title="Good job!"
              success
              confirmBtnBsStyle="success"
              onConfirm={() =>
                setSweetAlertState({ id: null, state: false, deleted: false })
              }
            >
              You deleted the data!
            </SweetAlert>
          )}

          {SweetAlertState.state ? (
            <SweetAlert
              title="Are you sure?"
              warning
              showCancel
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              onConfirm={async () => {
                const transFilter = income.filter(
                  (filter) => filter._id !== SweetAlertState.id
                );
                setIncome(transFilter);
             
                const token = localStorage.getItem("token");
                // console.log(data);
                await axios.delete(
                  `https://protected-spire-91265.herokuapp.com/api/transection/${SweetAlertState.id}`,{
                    headers : { 'Content-Type': 'application/json', "x-auth-token":token}
                  }
                );
                setSweetAlertState({ id: null, state: false, deleted: true });
              }}
              onCancel={() => {
                setSweetAlertState({ id: null, state: false, deleted: false });
              }}
            >
              You won't be able to revert this!
            </SweetAlert>
          ) : null}
          <Row>
            <Col sm={6} md={4} xl={3} className="mt-4">
              <div className="text-center"></div>
              <Modal isOpen={isOpen} toggle={tog_standard}>
                <ModalHeader toggle={tog_standard}>Income Modal</ModalHeader>
                <AvForm
                  className="needs-validation"
                  onValidSubmit={HandleSubmitBtn}
                >
                  <ModalBody>
                    

                    <FormGroup>
                      <Label htmlFor="validationCustom01">Select Date</Label>

                      <Datepicker
                        className="form-control"
                        selected={incomeObject.date}
                        onChange={handleChangeDate}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="validationCustom01">Amount</Label>
                      <AvField
                        name="amount"
                        placeholder="Amount ...."
                        type="number"
                        value={incomeObject.amount}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        errorMessage="Enter amount"
                        validate={{
                          required: { value: true },
                          pattern: {
                            value: "^[0-9]+$",
                            errorMessage: "Only Digits",
                          },
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="validationCustom01">Description</Label>
                      <AvField
                        type="textarea"
                        id="textarea"
                        name="description"
                        value={incomeObject.description}
                        onChange={(e) => handleChange(e)}
                        maxLength="150"
                        rows="3"
                        placeholder="Eneter Description minimum 5 chars maxium 150 chars..."
                        errorMessage="Enter description"
                        validate={{
                          required: { value: true },
                          minLength: { value: 5, errorMessage: "Min 5 chars." },
                          maxLength: {
                            value: 150,
                            errorMessage: "Max 150 chars.",
                          },
                        }}
                      />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="button"
                      color="danger"
                      onClick={tog_standard}
                      className="waves-effect"
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      color="success"
                      className="waves-effect waves-light"
                    >
                      Save Income
                    </Button>
                  </ModalFooter>
                </AvForm>
              </Modal>
            </Col>
          </Row>

          <ToastContainer />

          {/* data table Row  */}
          <Row>
            <Col xs={12}>
              <Card className="border border-secondary border-success">
                <CardHeader className="text-white bg-success">
                  You can save your income amounts here specifying the proper
                  income date, the income reason and the income amount.
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs={6}>
                      <h4 className="card-title">Income Table </h4>
                    </Col>
                    <Col xs={6}>
                      <Button
                        type="button"
                        onClick={tog_standard}
                        color="success"
                        
                        className="waves-effect waves-light mr-1 float-right"
                      >
                        <i className="ri-add-line"></i> Add Income
                      </Button>
                    </Col>
                  </Row>

                  <MDBDataTable responsive striped bordered data={UserData} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TransFunctional;
