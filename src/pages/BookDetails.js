import React from "react";
import {Link, hashHistory} from "react-router";
import BookStore from "./BookStore";
import userData from '../stores/userStore';

export default class BookDetails extends React.Component {
    componentWillMount() {
        /*
         This will fetch data each time you navigate to this route
         Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
         */
        userData.getBooks();
    }

    render() {
    let id = this.props.params.id;
    let book = userData.books.filter((book) => {
      return book.id === Number(id);
    })[0];
    return (
      <div>
        <h3 style={{color: "steelblue"}}>Detailed info for the title: {book.title}</h3>
        <h4> {book.info}</h4>
        <h4>{book.moreInfo}</h4>
          <button id={id} onClick={this.RemoveBook}>Remove booka</button>
        <br />
        <Link to="/products">Products</Link>
      </div>
    );
  }

  RemoveBook(event) {

      const id = event.target.id;
      console.log(event.target);
      // console.log("hhhdhdhd"+id);

      BookStore.deleteBook(id);
      hashHistory.push('/products');
  }


}