import React, { useState,useEffect } from 'react';
// import { Container } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
//Import Components
import MiniWidgets from "./MiniWidgets";
// import RevenueAnalytics from "./RevenueAnalytics";
// import SalesAnalytics from "./SalesAnalytics";
// import EarningReports from "./EarningReports";
// import Sources from "./Sources";
// import RecentlyActivity from "./RecentlyActivity";
// import RevenueByLocations from "./RevenueByLocations";
// import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";
import axios from 'axios'
import jwtDecode from  "jwt-decode";
// import { Route, Redirect } from "react-router-dom";

function StarterPage(props) {
    const [userBalance,setUserBalance]=useState({userincome:0,userExpense:0,balance:0})
    const [LatestTransections, setLatestTransections] = useState([])
    const{userincome,userExpense,balance}=userBalance

    const [UserPercentage, setUserPercentage] = useState({
      incomePer:0,
      expensePer:0,
      balancePer:0

    })
            const breadcrumbItems = [
                { title : "Nazox", link : "#" },
                { title : "Dashboard", link : "#" },
            ];
            const reports = [
                { icon : "ri-stack-line", title : "Total Incomes", value :"$ "+`${userincome}`, rate : `${UserPercentage.incomePer}`+" $", desc : "income" },
                { icon : "ri-store-2-line", title : "Total Expenses", value :"$ "+`${userExpense}`, rate : `${UserPercentage.expensePer}`+" %", desc : "Expense As Percentage" },
                { icon : "ri-briefcase-4-line", title : "Current Balance", value :"$ "+`${balance}`, rate : `${UserPercentage.balancePer}`+" %", desc : "Balance As Percentage" },
                // { icon : "ri-briefcase-4-line", title : "Average Price", value : "$ 15.4", rate : "2.4%", desc : "From previous period" },
            ];
            useEffect(() => {
              let userID=""
              const fetchTrensections = async () => {
                try {
                    if(localStorage.getItem("token")){
                      const token=localStorage.getItem("token")
                      const user = jwtDecode(token)
                      const {_id}=user
                      userID=_id
                     
                    }
                    const { data } = await axios.get(
                      `https://protected-spire-91265.herokuapp.com/api/statements/info/${userID}`
                    );  
                      setUserBalance(data);
                    
                    if(data.userincome===0){
                      setUserPercentage({incomePer:0,expensePer:0,balancePer:0})

                    }else{
                      let Income=data.userincome
                      let Expense=data.userExpense
                      let Balance=data.balance                  
                      let perbalance=Balance/Income*100
                      let perExpense=Expense/Income*100  
                      let PerBalanceRounded=Math.round(perbalance)
                      let PerExpenseRounded=Math.round(perExpense)                      
                         setUserPercentage({incomePer:Income,expensePer:PerExpenseRounded,balancePer:PerBalanceRounded})

                    }
                      

                      const { data:getLatestTransections } = await axios.get(
                        `https://protected-spire-91265.herokuapp.com/api/statements/${userID}`
                      );
                     let {info}=getLatestTransections;
                     let latest5Trans=info.slice(Math.max(info.length - 5, 0)) 
                     // sort data as date adc
                     latest5Trans.sort(function(a,b){
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(b.date) - new Date(a.date);
                      });
                      setLatestTransections(latest5Trans)
                      
                  } catch (error) {
                    console.log(error);
                    window.location.assign("/login")
                    // <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                  }
                };
                fetchTrensections();
               
              }, []);         
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
                    {/* index container  */}
                    <Row>
                            <Col xl={12}>
                                <Row>
                                    <MiniWidgets reports={reports} />
                                </Row>
                                {/* revenue Analytics */}
                               
                                {/* <RevenueAnalytics/> */}
                            </Col>

                            <Col xl={12}>
                           
                                <Row>
                                  
                                  <LatestTransactions Latest5Transections={LatestTransections}/>      
                                 
                                
                                </Row>
                            </Col>
                        </Row>
                  
                    
                    
                    </Container> 
                </div>
            </React.Fragment>
        );
    
}

export default StarterPage;