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
        UserStore.getBooks();
    }

    render() {

        // var lis = UserStore.books.map(function(book){
        //     return(
        //         <li key={book.id}>{book.title}</li>
        //     )
        // })


      return (
          <div>
              <h2>Clubs: (Liverpool is the WORST!!!!)</h2>
              {/*<ul>{lis}</ul>*/}
          </div>
      )
    }

  }
)
export default UserPage;