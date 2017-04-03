import React, { Component } from 'react'
import { observer } from "mobx-react";
import userData from "../stores/userStore";

const UserPage = observer(
  class UserPage extends Component {

    componentWillMount() {
      /*
     This will fetch data each time you navigate to this route
     Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
     */
      userData.getData();
    }

    render() {

        var lis = userData.clubs.map(function(club){
            return(
                <li> <a href={club.url}>{club.name}</a></li>
            )
        })


      return (
          <div>
              <h2>Clubs</h2>
              <ul>{lis}</ul>
          </div>
      )
    }

  }
)
export default UserPage;