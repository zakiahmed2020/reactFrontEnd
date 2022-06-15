import React, { Component } from "react";
import {
  Col,
  Dropdown,
  DropdownToggle,
  Card,
  Row,
  CardBody,
  CardHeader,
} from "reactstrap";
// import { Link } from "react-router-dom";
import jwtDecode from  "jwt-decode";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import account from './../../store/auth/register/reducer';

// const expandRow = {
//   renderer: row => (
//     <>
//   Action :
//   <Link to="#" className="mr-3 text-primary"><i className="mdi mdi-pencil font-size-18"></i></Link>
//   <Link to="#" className="text-danger" ><i className="mdi mdi-trash-can font-size-18"></i></Link>
//   </>
//   ),
//   showExpandColumn: true,
//   expandByColumnOnly: true
// };

class LatestTransactions extends Component {
  constructor(props) {
    // getTrnas=props.Latest5Transections;
    super(props);
    this.state = {
      menu: false,
    };
  }

  render() {
    const { Latest5Transections } = this.props;
    console.log(Object.values(Latest5Transections))
    // let account=0;
    // Latest5Transections.map(item=>account=item.accountNo)
    let currentUser={};
    if(localStorage.getItem("token")){
      const token=localStorage.getItem("token")
      const user = jwtDecode(token)
      currentUser=user;
    }
    const {name,accountNo,username,phone}=currentUser;
    const data = {
      columns: [
        // {
        //   dataField: "No",
        //   text: "No.",
        // },
        {
          dataField: "date",
          text: "Date",
          sort: "desc",
        },
        {
          dataField: "description",
          text: "Description",
        },
        {
          dataField: "income",
          text: "Income ",
        },
        {
          dataField: "expense",
          text: "Expense",
        },
      ],
      rows: Latest5Transections.map((statement) => {
        const data = { ...statement };

        data.date = new Date(data.date).toLocaleDateString();
        let count = 1;
        data.No = count++;

        if (data.type === "income") {
          data.income = "$ " + data.amount;
          data.expense = `$  0.00`;
        } else {
          data.expense = "$ " + data.amount;
          data.income = `$   0.00`;
        }
        // data.amount=new className="success";

        return data;
      }),
    };

    const options = {
      // pageStartIndex: 0,
      hideSizePerPage: false,
      hidePageListOnlyOnePage: false,
      sizePerPageList: [
        {
          text: "5th",
          value: 5,
        },
        {
          text: "10th",
          value: 10,
        },
        {
          text: "All",
          value: data.rows.length,
        },
      ],
    };

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
    };

    return (
      <React.Fragment>
        <Col lg={12}>
          <Card>
            <CardHeader className="text-white bg-success">
              You get here latest transections such your income,expense .
            </CardHeader>

            <CardBody>
              <Dropdown
                isOpen={this.state.menu}
                toggle={() => this.setState({ menu: !this.state.menu })}
                className="float-right"
              >
                <DropdownToggle tag="i" className="arrow-none card-drop">
                  <i className="mdi mdi-dots-vertical"></i>
                </DropdownToggle>
                {/* <DropdownMenu right>
                                                
                                                <DropdownItem>Sales Report</DropdownItem>
                                                
                                                <DropdownItem>Export Report</DropdownItem>
                                                
                                                <DropdownItem>Profit</DropdownItem>
                                                
                                                <DropdownItem>Action</DropdownItem>
                                            </DropdownMenu> */}
              </Dropdown>
              <Row>
                <Col lg={5}>
                  <h4 style={{ textAlign: "center" }}>
                    <u>Account Info</u>
                  </h4>
                  <table className="table ">
                    <thead>
                      <tr className="border-bottom">
                        <th > <h6>Account No</h6></th>
                        <th  style={{  textAlign: 'right'}} >
                          <h6>{accountNo}</h6>
                         
                        </th>
                      </tr>
                      <tr className="border-bottom">
                        <th ><h6>Username</h6></th>
                        <th style={{ textAlign: "right"}}>
                         <h6> {username}</h6>
                        </th>
                      </tr>
                      <tr className="border-bottom">
                        <th className="font-weight-bold"><h6>Fullname</h6></th>
                        <th style={{ textAlign: "right" }}>
                         
                          <h6> {name}</h6>
                        </th>
                      </tr>
                      <tr className="border-bottom">
                        <th className="font-weight-bold"><h6>Phone</h6></th>
                        <th style={{ textAlign: "right",}}>
                          <h6>{phone}</h6>
                        
                        </th>
                      </tr>

                    </thead>
                   
                  </table>
                </Col>
                <Col lg={7}>
                  {/* <h4 className="card-title mb-4">Latest Transactions</h4> */}
                  <h4 style={{ textAlign: "center" }}>
                    <u>Latest Transactions</u>
                  </h4>

                  <BootstrapTable
                    keyField="id"
                    data={data.rows}
                    columns={data.columns}
                    // expandRow={ expandRow }
                    pagination={paginationFactory(options)}
                    selectRow={selectRow}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default LatestTransactions;
