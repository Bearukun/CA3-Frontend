import React, { Component } from 'react'
import {observer} from "mobx-react";
import AdminStore from "../stores/adminStore";
import auth from '../authorization/auth';

const AdminPage = observer(
  class AdminPage extends Component {

    componentWillMount() {
      /*
      This will fetch data each time you navigate to this route
      Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
      */
        AdminStore.getData();
    }

    render() {

        // var lis = AdminStore.users.map(function(user){
        //     return(
        //         <li key={user.userName}>{user.role}</li>
        //     )
        // })
          var lis =  AdminStore.users.map(function(user) {
              return (
                  <li key={user.userName}> {user.userName}</li>
              )
            })

      return (
        <div>
          <h2>User administration</h2>

          <div className="msgFromServer">
              {/*{auth.loggedIn && auth.isAdmin?//only show if logged in and a user*/}
                  {/*<ul>{lis}</ul>*/}
                  {/*: null}*/}
              <ul>{lis}</ul>
          {/*{AdminStore.messageFromServer}*/}



              {/*{AdminStore.messageFromServer}*/}

          </div>
          <h4 style={{color: "red"}}>{AdminStore.errorMessage}</h4>
        </div>
      )
    }

  }
)
export default AdminPage;