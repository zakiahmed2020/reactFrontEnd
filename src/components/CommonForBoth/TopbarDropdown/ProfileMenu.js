import React, { useState,useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//i18n
import { withNamespaces } from "react-i18next";

// users
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import jwtDecode from  "jwt-decode";

// import Logout from './../../../pages/Authentication/Logout';
function ProfileMenu ({history}) {
    const [menu, setMenu] = useState(false)
    const [CurrentUser, setCurrentUser] = useState({username:""})


    useEffect(() => {
     
          try {
            // let userID=""
            if(localStorage.getItem("token")){
              const token=localStorage.getItem("token")
              const user=jwtDecode(token)
              const {name}=user
            //   userID=_id
              setCurrentUser({username:name}) 
            }
    
          
          } catch (error) {
            console.log(error);
            window.location.assign("/login")
          }
   
     
      }, []);

    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         menu: false,
    //         logOut: false,
    //         UserName:""
    //     };
    //     this.toggle = this.toggle.bind(this);
    // }
    const toggle=()=>{
        setMenu(true)

        // setMenu(prevState => ({
        //     menu: !prevState.menu
        // }));
        setTimeout(() => {
            setMenu(false)
          }, 2000);
    };

 
      
   const  hadnleSubmit=()=>{
   
    window.location.assign("/login");
       localStorage.removeItem("token")
       console.log("cliked")
   
    }
    // componentWillUnmount = () => {
    //     try {
    
    //         let userID=""
    //         if(localStorage.getItem("token")){
    //           const token=localStorage.getItem("token")
    //           const user=jwtDecode(token)
              
    //           const {_id,name}=user
    //           userID=_id
    //         this.setState({UserName:name})
    //         }
    
           
    //       } catch (error) {
    //         console.log(error);
    //       }
    //   }


    

//    if(localStorage.getItem("authUser"))
//    {
//         const obj = JSON.parse(localStorage.getItem("authUser"));
//         const uNm = obj.email.split("@")[0];
//         username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
//    }
  
        return (
            <React.Fragment>
                        <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block user-dropdown">
                            <DropdownToggle tag="button" className="btn header-item waves-effect" id="page-header-user-dropdown">
                                <img className="rounded-circle header-profile-user mr-1" src={avatar2} alt="Header Avatar"/>
                                <span className="d-none d-xl-inline-block ml-1 text-transform">{CurrentUser.username}</span>
                                <i className="mdi mdi-chevron-down d-none ml-1 d-xl-inline-block"></i>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="#"><i className="ri-user-line align-middle mr-1"></i> Profile </DropdownItem>

                                <DropdownItem divider />

                                <DropdownItem onClick={hadnleSubmit} className="text-danger"   ><i className="ri-shut-down-line align-middle mr-1 text-danger">
                                    </i> Logout
                                    </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
            </React.Fragment>
        );
    }


export default withNamespaces()(ProfileMenu);
