import React, { Component } from 'react'
import {observer} from "mobx-react";
import adminStore from "../stores/adminStore";
//import {Link} from "react-router/es/Link";
// import auth from '../authorization/auth';

// const AdminPage = observer(
@observer
  class AdminPage extends Component {

    // componentWillMount() {
    //   /*
    //   This will fetch data each time you navigate to this route
    //   Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
    //   */
    //     adminStore.getData();
    // }
constructor() {
    super();
    adminStore.getData();

}

    render() {

        // var lis = adminStore.users.map(function(user){
        //     return(
        //         <li key={user.userName}>{user.role}</li>
        //     )
        // })


        // var lis =  adminStore.users.map(function(user) {
        // var lis =  adminStore.users.map(function(user) {
        // var lis =  adminStore.users.map(function(user)=> {






        var lis =  adminStore.users.map((user)=> {
              return (
                  <li key={user.username}>
                      <b>User Name:</b> <i>{user.username} </i>
                      <b>Role:</b> <i>{user.roles} </i>
                      <button id={user.username} onClick={this.removeUser}> Remove User</button></li>
              )
            })

      return (
        <div>
          <h2>User administration</h2>

          <div>
              {/*{auth.loggedIn && auth.isAdmin?//only show if logged in and a user*/}
                  {/*<ul>{lis}</ul>*/}
                  {/*: null}*/}
              <ul>{lis}</ul>
          {/*{adminStore.messageFromServer}*/}



              {/*{adminStore.messageFromServer}*/}

          </div>
          <h4 style={{color: "red"}}>{adminStore.errorMessage}</h4>
        </div>
      )
    }


    removeUser(event) {
        const id = event.target.id;//save id of button
         adminStore.deleteUser(id);
    }

  }
// )
export default AdminPage;