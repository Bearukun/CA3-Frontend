import React from "react";
import {Link, hashHistory} from "react-router";
import BookStore from "./BookStore";

export default class BookDetails extends React.Component {
  render() {
    let id = this.props.params.id;
    let book = this.props.route.books.filter((book) => {
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