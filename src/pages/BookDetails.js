import React from "react";
import {Link, hashHistory} from "react-router";
import UserStore from '../stores/userStore';

export default class BookDetails extends React.Component {
    // componentWillMount() {
    //     /*
    //      This will fetch data each time you navigate to this route
    //      Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
    //      */
    //     UserStore.getBooks();
    // }

    render() {
        let id = this.props.params.id;
        let book = UserStore.books.filter((book) => {
          return book.id === Number(id);
        })[0];
        return (
          <div>
            <h3 style={{color: "steelblue"}}>Detailed info for the title: {book.title}</h3>
            <h4> {book.info}</h4>
            <h4>{book.moreInfo}</h4>
              <button id={id} onClick={this.removeBook}>Remove book</button>
            <br />
            <Link to="/products">Products</Link>
          </div>
        );
  }

  removeBook(event) {
      const id = event.target.id;//save id of button, which is identical to the id of the book to be deleted
      UserStore.deleteBook(id);
      hashHistory.push('/products');
  }
}