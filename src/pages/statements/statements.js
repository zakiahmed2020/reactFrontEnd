import React, {useEffect, useState } from "react";
// import { Container } from "reactstrap";
import axios from "axios";
import { useMediaPredicate } from "react-media-hook";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  CardHeader
} from "reactstrap";
import { MDBDataTable } from "mdbreact";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
//Import Components
import jwtDecode from  "jwt-decode";
function StarterPage() {
  const [staments, setStatements] = useState([]);

  const [stamentObjs, setStatementsObj] = useState({
    selectedDate: "Alldate",
    startDate: "",
    endDate: "",
  });
  const [selectDate, setSelectedDate] = useState(true);
  const [tempData, settempData] = useState([])
  const breadcrumbItems = [
    { title: "Nazox", link: "#" },
    { title: "Statements", link: "#" },
  ];
 

  const { selectedDate, startDate, endDate } = stamentObjs;
  // let tempData=[]
  useEffect(() => {
    const getStatements = async () => {
      try {
        let userID=""
        if(localStorage.getItem("token")){
          const token=localStorage.getItem("token")
          const user=jwtDecode(token)
          const {_id}=user
          userID=_id
          
        }
        
        const { data } = await axios.get(
          `https://protected-spire-91265.herokuapp.com/api/statements/${userID}`
        );
        
        // settempData((prev) => {
        //   return { ...prev, ...data};
        // });
        
        let temp=JSON.stringify(data.info)
        settempData(temp);
       
      } catch (error) {
        console.log(error);
      }
    };
    getStatements();
  }, []);
  

  const handlePost = async () => {
    // console.log("cliked")
    try {
      // console.log(tempData)
      let data=JSON.parse(tempData)
      
      const Data = data.filter((s) => {
        let obj = { ...s };
        obj.date = new Date(obj.date);
        stamentObjs.startDate = new Date(stamentObjs.startDate);
        stamentObjs.endDate = new Date(stamentObjs.endDate);
        if (stamentObjs.selectedDate === "Alldate") {
       
          return s;
        }

        if (
          obj.date >= stamentObjs.startDate &&
          obj.date <= stamentObjs.endDate
        ) {
          return s;
        }
        return null;
      });

     
      setStatements(Data);
    } catch (error) {
      console.log(error);
    }
  };
  const biggerThan400 = useMediaPredicate("(min-width: 600px)");
  console.log(biggerThan400)

  const handleChange = (e) => {
    console.log(e.target.name + " " + e.target.value);

    setStatementsObj((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    if (e.target.value === "specificDate") {
      console.log(stamentObjs.selectedDate);
      setSelectedDate(false);
    } else if (e.target.value === "Alldate") {
      setSelectedDate(true);
    }
  };

  const data = {
    columns: [
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 270,
      },
      {
        label: "Income",
        field: "income",
        sort: "asc",
        width: 200,
      },
      {
        label: "Expense",
        field: "expense",
        sort: "asc",
        width: 200,
      },
      {
        label: "Balance",
        field: "runBalance",
        sort: "asc",
        width: 100,
      },
      // {
      //   label: "Start date",
      //   field: "date",
      //   sort: "asc",
      //   width: 150
      // },
    ],
    rows: staments.map((statement) => {
      const data = { ...statement };
      data.date = new Date(data.date).toLocaleDateString();
      data.runBalance="$ "+data.runBalance
      data.type === "income"
        ? (data.income = "$ " + data.amount)
        : (data.expense = "$ " + data.amount);
      // data.amount=new className="success";

      if (data.type === "income") {
        data.income = (
          <div className="badge badge-soft-success font-size-12">
            {data.income}
          </div>
        );
        // data.expense = 0.00
      } else {
        data.expense = (
          <div className="badge badge-soft-warning font-size-12">
            {data.expense}
          </div>
        );
        // data.income = 0.00
      }

      // if (
      //   data.date > stamentObjs.startDate &&
      //   data.date < stamentObjs.endDate
      // ) {
      //   return data;
      // }

      return data;
    }),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Statements" breadcrumbItems={breadcrumbItems} />
          {/* data table  */}

          <Row>
            <Col xs={12}>
              <Card  className="border border-secondary border-success">
              <CardHeader className="text-white bg-success" >
              You can find here the overall transactions of your account and print them monthly, yearly or overall.
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs={3}>
                      <FormGroup>
                        <Label htmlFor="validationCustom01">
                          Select Date Type
                        </Label>
                        <select
                          className="form-control"
                          name="selectedDate"
                          value={selectedDate}
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="Alldate">All Dates</option>
                          <option value="specificDate">Specific Date</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col xs={3}>
                      <FormGroup>
                        <Label htmlFor="validationCustom01">
                          Select Start Date
                        </Label>
                        <Input
                          className="form-control"
                          type="date"
                          name="startDate"
                          disabled={selectDate}
                          value={startDate}
                          onChange={(e) => handleChange(e)}
                          // defaultValue="2020-03-19"
                          id="example-date-input"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={3}>
                      <FormGroup>
                        <Label htmlFor="validationCustom01">
                          Select End Date
                        </Label>
                        <Input
                          className="form-control"
                          type="date"
                          name="endDate"
                          disabled={selectDate}
                          value={endDate}
                          onChange={(e) => handleChange(e)}
                          // defaultValue="2020-03-19"
                          id="example-date-input"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={3}>
                      <FormGroup >
                        <Button
                          type="submit"
                          onClick={handlePost}
                          color="success"
                          // type="button"
                          className="waves-effect waves-light mt-4"
                        >
                          <i className=" ri-search-line"></i> Generate
                        </Button>
                        
                       
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* <hr /> */}

                  <hr style={{ border: "1px solid lightgrey" }} />
                  {/* <h4 className="card-title">Statements Table </h4> */}

                  <MDBDataTable responsive striped bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
export default StarterPage;
