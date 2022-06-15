import React, { useEffect, useState,} from "react";
// import { Container } from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
// import axios from "axios"
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Container,
  Button,
 
  Label,

  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
 
  UncontrolledAlert,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { AvForm, AvField } from "availity-reactstrap-validation";

import Datepicker from "react-datepicker";
import jwtDecode from  "jwt-decode";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
//Import Components
import axios from "axios";

const TransFunctional = () => {
  const [visibleAlert, setVisibleAlert] = useState({
    visible: false,
    message: "",
    color:""
  });

 
  const [isOpen, setIsOpen] = useState(false);
  const [expense, setExpense] = useState([]);
  // check data is update or create data 
  const [editCondition, setEditCondition] = useState(false);
  const [expenseObj, setExpenseObj] = useState({
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
    name:"",
    UserID:"",
  })
  // const { date, amount, description } = expenseObj;
  const tog_standard = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    console.log(expenseObj)
    // setExpenseObj({
    //   date: new Date(),
    //   amount: "",
    //   description: "",
    // });
    setEditCondition(false);
    // setVisibleAlert({ visible: false, message: "", color: "" });

    removeBodyCss();
  };
  const breadcrumbItems = [
    { title: "Nazox", link: "#" },
    { title: "Expense", link: "#" },
  ];
  useEffect(() => {
    const fetchTrensections = async () => {
      try {
        let userID=""
        if(localStorage.getItem("token")){
          const token=localStorage.getItem("token")
          const user=jwtDecode(token)
          const {_id,name}=user
          userID=_id
          setCurrentUserInfo({UserID:_id,name:name}) 
        }
        const token = localStorage.getItem("token");
       
        const { data } = await axios.get(
          `https://protected-spire-91265.herokuapp.com/api/transection/${userID}/expense`,{
          headers : { 'Content-Type': 'application/json', "x-auth-token":token}
        }
        );
       
        setExpense(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrensections();
  }, []);
 
  const removeBodyCss = async () => {
    document.body.classList.add("no_padding");
  };
 
  const handleChange = (e) => {
    
    setExpenseObj((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeDate = (dt) => {
    setExpenseObj((prev) => {
      return { ...prev, date: dt };
    });
  };
  const handleEdit = async (tran) => {
    const data = { ...tran };
    // console.log(data);
    data.date = new Date(data.date);
    delete data.action
    delete data.amount2
    delete data.Time
     console.log(data)

    setEditCondition(true);
    setExpenseObj(data);
    setIsOpen(!isOpen);
  };
  const notify = (message, type) => toast[type](message);

  const HandleSubmitBtn = async (e) => {
    e.preventDefault();
    const mainObj = {
      ...expenseObj,
      userID: CurrentUserInfo.UserID,
      type: "expense",
    };
    console.log(mainObj)
  //  delete mainObj.amount2
  //  delete mainObj.action
  const token = localStorage.getItem("token");
    if (editCondition) {
      const {data} = await axios.put(
        `https://protected-spire-91265.herokuapp.com/api/transection/${mainObj._id}`,
        mainObj,{
          headers : { 'Content-Type': 'application/json', "x-auth-token":token}
        }
      );

      // const { status, message, info } = { ...data };
        const { status, message, info } = {...data} ;
     
        if(status){
          console.log("info",info)
          // setExpense((prev) => {
          //   return [...prev, info];
          // });
          const updata = expense.filter((i) => i._id !== mainObj._id);
         setExpense([info, ...updata]);
          setExpense((prev) => {
            return [...prev, info];
          });

          setExpenseObj({
              date: new Date(),
              amount: "",
              description: "",
            });
            notify(message, "success");
            setIsOpen(false);
            // let s="success"
            // handleVisibleSuccess(true, message,s);
        }
      
    } else {
      // alert("Success inserted data");
      const { data } = await axios.post(
        "https://protected-spire-91265.herokuapp.com/api/transection",
        mainObj,{
        headers : { 'Content-Type': 'application/json', "x-auth-token":token}
        }
      );

      // console.log(response);
      const { status, message, info } = { ...data };
      if (status) {
        
        setExpense((prev) => {
          return [...prev, info];
        });
        console.log(message);
        setExpenseObj({
          date: new Date(),
          amount: "",
          description: "",
        });
        // let s = "success";
        // handleVisibleSuccess(true, message,s);
        notify(message, "success");
        setIsOpen(false);
        // console.log(message);
      } else {
        let d = "danger";
        handleVisibleError(true, message,d);
        // console.log("status is false"+message)
      }
    }
  };

  

 
  const handleVisibleError = (visible, message, color) => {
    // console.log(visible+message)
    setVisibleAlert({ visible: visible, message: message, color: color });
  };
  const handleDelete = async (id) => {
    setSweetAlertState({ id: id, state: true, deleted: false });
  };

  const data = {
    columns: [
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 150,
      },
      {
        label: "Amount",
        field: "amount2",
        sort: "asc",
        width: 270,
      },
      {
        label: "Created Date",
        field: "date",
        sort: "asc",
        width: 200,
      },
      {
        label: "Created Time",
        field: "Time",
        sort: "asc",
        width: 200,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: expense.map((trans) => {
      const data = { ...trans}
      data.Time = new Date(data.date).toLocaleTimeString();
      data.date = new Date(data.date).toLocaleDateString();
      
      // data.amount=new className="success";

      data.action = (
        <div>
          <button
            type="button"
            onClick={() => handleEdit(data)}
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
      data.amount2 ="$ "+ data.amount
      
      return data;
    }),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Expense" breadcrumbItems={breadcrumbItems} />
          {SweetAlertState.deleted && (
            <SweetAlert
              title="Good job!"
              success
              confirmBtnBsStyle="success"
              onConfirm={() =>
                setSweetAlertState({ id: null, state: false, deleted: false })
              }
            >
              You clicked the button!
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
                const transFilter = expense.filter(
                  (filter) => filter._id !== SweetAlertState.id
                );
                setExpense(transFilter);
                const token = localStorage.getItem("token");
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
          ):null}

          {/* models   */}

          <Row>
            <Col sm={6} md={4} xl={3} className="mt-4">
              <div className="text-center"></div>

              <Modal isOpen={isOpen} toggle={tog_standard}>
                <ModalHeader toggle={tog_standard}>Expense Modal</ModalHeader>

                <AvForm
                  className="needs-validation"
                  id="tooltipForm"
                  onValidSubmit={HandleSubmitBtn}
                >
                  <ModalBody>
                    <UncontrolledAlert
                      isOpen={visibleAlert.visible}
                      type="hidden"
                      color={visibleAlert.color}
                      role="alert"
                    >
                      {visibleAlert.message}
                    </UncontrolledAlert>

                    <FormGroup>
                      <Label htmlFor="validationCustom01">Select Date</Label>
                      <Datepicker
                        className="form-control"
                        selected={expenseObj.date}
                        onChange={handleChangeDate}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="validationCustom01">Amount</Label>
                      <AvField
                        name="amount"
                        placeholder="Amount ...."
                        type="number"
                        value={expenseObj.amount}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        errorMessage="Enter amount"
                        validate={{
                          required: { value: true },
                          pattern: {
                            value: "^[0-9]+$",
                            errorMessage: "Only Digits"
                          }
                        }}
                     
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="validationCustom01">Description</Label>
                      <AvField
                        type="textarea"
                        id="textarea"
                        name="description"
                        value={expenseObj.description}
                        onChange={(e) => handleChange(e)}
                    
                        maxLength="150"
                        rows="3"
                        placeholder="Eneter Description minimum 5 chars maxium 150 chars..."
                        errorMessage="Enter description"
                        validate={{
                          required: { value: true },
                          minLength: { value: 5, errorMessage: "Min 5 chars." },
                          maxLength: { value: 150, errorMessage: "Max 150 chars."}
                        }}
                      />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="button"
                      color="danger"
                      className="waves-effect"
                      onClick={tog_standard}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      color="success"
                      //   onClick={tog_standard}
                      className="waves-effect waves-light"
                    >
                      Save Expense
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
              <Card  className="border border-secondary border-success">
                <CardHeader className="text-white bg-success" >
                You can save your expense amounts here specifying the proper expense date, the expense reason and the expense amount.
                </CardHeader>
                
                <CardBody>
                  <Row>
                    <Col xs={6}>
                      <h4 className="card-title">Expense Table </h4>
                    </Col>
                    <Col xs={6}>
                      <Button
                        type="button"
                        onClick={tog_standard}
                        color="success"
                       
                        className="waves-effect waves-light mr-1 float-right"
                      >
                        <i className="ri-add-line"></i> Add Expense
                      </Button>
                    </Col>
                  </Row>

                  <MDBDataTable responsive striped bordered data={data} />
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
