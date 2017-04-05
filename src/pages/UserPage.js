import React, { Component } from 'react'
import { observer } from "mobx-react";
import UserStore from '../stores/userStore';

const UserPage = observer(
  class UserPage extends Component {

    componentWillMount() {
      /*
     This will fetch data each time you navigate to this route
     Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
     */
        UserStore.getData();
    }

    render() {

        var lis = UserStore.clubs.map(function(club){
            return(
                <li> <a href={club.url}>{club.name}</a></li>
            )
        })


      return (
          <div>
              <h2>Clubs: (Liverpool is the best!!!)</h2>
              <ul>{lis}</ul>
          </div>
      )
    }

  }
)
export default UserPage;