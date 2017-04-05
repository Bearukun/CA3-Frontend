import React, { Component } from 'react'
import {observer} from "mobx-react";
import UserStore from "../stores/adminStore";

const AdminPage = observer(
  class AdminPage extends Component {

    componentWillMount() {
      /*
      This will fetch data each time you navigate to this route
      Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
      */
        UserStore.getData();
    }

    render() {
      return (
        <div>
          <h2>User administration</h2>
          <p>Hej!</p>
          <div className="msgFromServer">
          {UserStore.messageFromServer}
          </div>
          <h4 style={{color: "red"}}>{UserStore.errorMessage}</h4>
        </div>
      )
    }

  }
)
export default AdminPage;